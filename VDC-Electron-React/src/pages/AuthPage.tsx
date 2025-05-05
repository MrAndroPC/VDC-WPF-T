import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';
import { UserSession } from '../models/UserSession';
import { RegisterVetPayload } from '../services/api'; // Import RegisterVetPayload

// Define props interface
interface AuthPageProps {
  onLoginSuccess: (user: UserSession | null) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => { // Destructure prop
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // For registration
  const [phone, setPhone] = useState(''); // For registration
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  // const [role, setRole] = useState<'vet' | 'owner'>('vet'); // Removed role state
  const [position, setPosition] = useState(''); // Vet registration field
  const [clinicNumber, setClinicNumber] = useState(''); // Vet registration field
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State for toggling

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setConfirmPassword('');
    setPosition('');
    setClinicNumber('');
    setError(null);
  }

  const handleLogin = async () => { // Removed event param, called from handleSubmit
    // Login logic remains largely the same...
    // event.preventDefault(); // This was incorrectly left here, removed.
    setIsLoading(true);
    setError(null);

    // --- Placeholder Login Logic ---
    // In a real scenario, you would:
    // 1. Send email/password to the main process via IPC (e.g., window.sessionAPI.login(email, password))
    // 2. The main process would handle authentication (e.g., check against stored users, call an external API)
    console.log('Attempting login with:', email);
    try {
      let loggedInUser: UserSession | null = null;

      // --- Development Mock Credential Check ---
      if (email === "vet@example.com" && password === "password") {
        console.log("Using mock credentials for login.");
        // Create mock user
        loggedInUser = {
          id: 1,
          fullname: 'Иванов Иван Иванович (Mock)',
          email: email,
          position: 'Главный Врач',
          clinic_number: 'Клиника №1',
          token: 'mock-token-123', // Add a mock token
        };
        // For mock login, directly update state and navigate
        console.log('Login successful (mock), updating state and navigating...');
        onLoginSuccess(loggedInUser);
        navigate('/');
        setIsLoading(false); // Ensure loading stops
        return; // Exit function after mock login
      } else {
        // --- Real API Call ---
        console.log("Attempting real API login...");
        loggedInUser = await window.sessionAPI.login({ email, password });
      }

      // --- Handle Login Result ---
      if (loggedInUser) {
        console.log('Login successful (API), updating state and navigating...');
        onLoginSuccess(loggedInUser); // Update state in App
        navigate('/'); // Navigate to main page
      } else {
        // API call succeeded but returned null (shouldn't happen with JWT decode logic in main?)
        // Or the API call itself failed and threw an error caught below.
        setError('Login failed. Please check credentials.');
        onLoginSuccess(null); // Ensure state is cleared
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
    // --- End Placeholder Logic ---
  };

  // Placeholder for registration logic
  const handleRegister = async () => { // Removed event param
    setIsLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      setIsLoading(false);
      return;
    }
    // --- Placeholder Registration Logic ---
    // In a real scenario, you would:
    // 1. Construct the correct DTO based on the selected role (Vet or Owner)
    // 2. Call the appropriate signup endpoint via IPC (e.g., window.sessionAPI.registerVet(...) or window.sessionAPI.registerOwner(...))
    // 3. Handle the response (token or error)
    // 4. If successful, set the session using onLoginSuccess(user) and navigate
    const payload: RegisterVetPayload = {
        fullname: fullName,
        email: email,
        password: password, // Send password for registration
        phone: phone || undefined, // Send if provided
        position: position || undefined, // Send if provided
        clinic_number: clinicNumber || undefined, // Send if provided
    };
    console.log('Attempting registration with:', payload);
    try {
      // --- Real API Call ---
      const registeredUser = await window.sessionAPI.registerVet(payload);

      if (registeredUser) {
         console.log('Registration successful (API), updating state and navigating...');
         onLoginSuccess(registeredUser); // Update state in App
         navigate('/'); // Navigate to main page
      } else {
         // API call succeeded but returned null (shouldn't happen with JWT decode logic in main?)
         // Or the API call itself failed and threw an error caught below.
         setError('Registration failed.');
         onLoginSuccess(null); // Ensure state is cleared
      }
       // --- End Mock Success ---
    } catch (err) {
       console.error("Registration error:", err);
       setError(err instanceof Error ? err.message : 'An unexpected error occurred during registration.');
    } finally {
       setIsLoading(false);
    }
     // --- End Placeholder Logic ---
  };

  // Handle form submission based on mode
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };


  // Toggle between Login and Register modes
  const toggleFormMode = () => {
    setIsRegistering(!isRegistering);
    clearForm(); // Clear form when toggling
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1 className={styles.title}>{isRegistering ? 'Регистрация' : 'Вход в систему'}</h1>

        {/* Email Input (Common) */}
        <input
            type="email"
            id="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Basic HTML5 validation
            disabled={isLoading}
          />

        {/* Full Name Input (Register only) */}
        {isRegistering && (
          <input
            type="text"
            id="fullName"
            placeholder="ФИО"
            className={styles.input}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required={isRegistering}
            disabled={isLoading}
          />
        )}

         {/* Phone Input (Register only) */}
         {isRegistering && (
          <input
            type="tel" // Use tel type
            id="phone"
            placeholder="Номер телефона"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={isRegistering}
            disabled={isLoading}
          />
        )}

        {/* Role Selection Removed */}

         {/* Position Input (Register only) */}
         {isRegistering && (
          <input
            type="text"
            id="position"
            placeholder="Должность"
            className={styles.input}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required={isRegistering} // Required if registering
            disabled={isLoading}
          />
        )}

         {/* Clinic Input (Register only) */}
         {isRegistering && (
          <input
            type="text"
            id="clinicNumber"
            placeholder="Клиника"
            className={styles.input}
            value={clinicNumber}
            onChange={(e) => setClinicNumber(e.target.value)}
            required={isRegistering} // Required if registering
            disabled={isLoading}
          />
        )}


        {/* Password Input (Common) */}
        <input
            type="password"
            id="password"
            placeholder="Пароль"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

        {/* Confirm Password Input (Register only) */}
        {isRegistering && (
          <input
            type="password"
            id="confirmPassword"
            placeholder="Повторите пароль"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={isRegistering}
            disabled={isLoading}
          />
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? (isRegistering ? 'Регистрация...' : 'Вход...') : (isRegistering ? 'Зарегистрироваться' : 'Войти')}
        </button>

        {/* Toggle Link */}
         <p className={styles.toggleLink} onClick={toggleFormMode}>
           {isRegistering ? 'Уже есть аккаунт? Войти' : "Нет аккаунта? Зарегистрироваться"}
         </p>
      </form>
    </div>
  );
};

export default AuthPage;
