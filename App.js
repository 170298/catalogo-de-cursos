import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CURSOS = [
  {
    id: '1',
    nombre: 'React Native',
    horas: 20,
    descripcion: 'Desarrollo de aplicaciones móviles.',
  },
  {
    id: '2',
    nombre: 'Diseño Web',
    horas: 18,
    descripcion: 'Creación de interfaces para sitios web.',
  },
  {
    id: '3',
    nombre: 'Ofimática',
    horas: 16,
    descripcion: 'Uso de documentos, presentaciones y hojas de cálculo.',
  },
  {
    id: '4',
    nombre: 'Marketing Digital',
    horas: 12,
    descripcion: 'Estrategias de comunicación digital.',
  },
];

function InicioScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.courseCard, pressed && styles.pressed]}
      onPress={() => navigation.navigate('Detalle', { curso: item })}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalles de ${item.nombre}`}
    >
      <View style={styles.courseText}>
        <Text style={styles.courseName}>{item.nombre}</Text>
        <Text style={styles.courseHours}>{item.horas} horas</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>APRENDE ALGO NUEVO</Text>
          <Text style={styles.title}>Catálogo de Cursos</Text>
          <Text style={styles.subtitle}>
            Explora nuestros cursos y registra tu interés.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Cursos disponibles</Text>
        <FlatList
          data={CURSOS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <Text style={styles.footer}>Selecciona un curso para ver más información.</Text>
      </View>
    </SafeAreaView>
  );
}

function DetalleScreen({ route, navigation }) {
  const { curso } = route.params;
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptaCondiciones, setAceptaCondiciones] = useState(false);

  const confirmarInteres = () => {
    if (!nombre.trim()) {
      Alert.alert('Dato requerido', 'Por favor, escribe tu nombre.');
      return;
    }

    if (!correo.trim() || !correo.includes('@')) {
      Alert.alert('Correo no válido', 'Ingresa un correo que contenga el carácter @.');
      return;
    }

    if (!aceptaCondiciones) {
      Alert.alert(
        'Falta aceptar las condiciones',
        'Activa el interruptor para aceptar las condiciones antes de continuar.'
      );
      return;
    }

    Alert.alert(
      '¡Interés registrado!',
      `Gracias, ${nombre.trim()}. Tu interés en el curso "${curso.nombre}" ha sido registrado (simulación).`,
      [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('Inicio'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.detailContainer} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>‹  Volver al catálogo</Text>
          </Pressable>

          <View style={styles.detailHero}>
            <View style={styles.courseBadge}>
              <Text style={styles.courseBadgeText}>{curso.horas} H</Text>
            </View>
            <Text style={styles.detailTitle}>{curso.nombre}</Text>
            <Text style={styles.detailHours}>{curso.horas} horas de formación</Text>
            <Text style={styles.description}>{curso.descripcion}</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Registra tu interés</Text>
            <Text style={styles.formSubtitle}>
              Completa tus datos para simular el registro.
            </Text>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              value={nombre}
              onChangeText={setNombre}
              placeholder="Escribe tu nombre"
              placeholderTextColor="#8A94A6"
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              value={correo}
              onChangeText={setCorreo}
              placeholder="nombre@correo.com"
              placeholderTextColor="#8A94A6"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <View style={styles.switchRow}>
              <View style={styles.switchCopy}>
                <Text style={styles.switchTitle}>Acepto las condiciones</Text>
                <Text style={styles.switchHint}>Confirmo que los datos son correctos.</Text>
              </View>
              <Switch
                value={aceptaCondiciones}
                onValueChange={setAceptaCondiciones}
                trackColor={{ false: '#CBD5E1', true: '#9CC7FF' }}
                thumbColor={aceptaCondiciones ? '#2563EB' : '#F8FAFC'}
              />
            </View>

            <Pressable
              onPress={confirmarInteres}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            >
              <Text style={styles.primaryButtonText}>Confirmar interés</Text>
            </Pressable>
            <Text style={styles.note}>Este formulario es una demostración; no guarda información.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: '#123B70' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#F3F6FB' },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ title: 'Catálogo de Cursos' }}
        />
        <Stack.Screen
          name="Detalle"
          component={DetalleScreen}
          options={{ title: 'Detalle del curso' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#F3F6FB' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12 },
  hero: {
    backgroundColor: '#123B70',
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },
  eyebrow: { color: '#A9D2FF', fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#E2ECFA', fontSize: 14, lineHeight: 21 },
  sectionTitle: { color: '#172B4D', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  listContent: { gap: 12, paddingBottom: 12 },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4EAF3',
  },
  courseText: { flex: 1 },
  courseName: { color: '#172B4D', fontSize: 16, fontWeight: '700', marginBottom: 5 },
  courseHours: { color: '#64748B', fontSize: 13 },
  chevron: { color: '#2563EB', fontSize: 32, marginLeft: 12, marginTop: -3 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  footer: { color: '#64748B', textAlign: 'center', fontSize: 12, marginTop: 8, paddingVertical: 8 },
  detailContainer: { padding: 20, paddingBottom: 32 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 6, marginBottom: 12 },
  backText: { color: '#2563EB', fontSize: 14, fontWeight: '700' },
  detailHero: { backgroundColor: '#E5EFFD', borderRadius: 20, padding: 22, marginBottom: 18 },
  courseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D0E3FF',
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginBottom: 13,
  },
  courseBadgeText: { color: '#174A8B', fontWeight: '800', fontSize: 12 },
  detailTitle: { color: '#123B70', fontSize: 26, fontWeight: '800', marginBottom: 6 },
  detailHours: { color: '#2563EB', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  description: { color: '#334155', fontSize: 15, lineHeight: 23 },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E4EAF3',
  },
  formTitle: { color: '#172B4D', fontSize: 20, fontWeight: '800', marginBottom: 5 },
  formSubtitle: { color: '#64748B', fontSize: 13, lineHeight: 19, marginBottom: 20 },
  label: { color: '#334155', fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 3 },
  input: {
    borderWidth: 1,
    borderColor: '#D7DFEA',
    backgroundColor: '#FAFCFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#172B4D',
    fontSize: 15,
    marginBottom: 15,
  },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8, gap: 12 },
  switchCopy: { flex: 1 },
  switchTitle: { color: '#172B4D', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  switchHint: { color: '#64748B', fontSize: 12, lineHeight: 17 },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  note: { color: '#7A8799', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 13 },
});
