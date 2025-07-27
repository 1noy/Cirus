# Contribuer à Cirus Messenger

Merci de vouloir contribuer à ce projet !

## Bonnes pratiques
- Forkez le repo et créez une branche pour chaque fonctionnalité ou correction
- Écrivez des tests unitaires pour chaque nouvelle fonctionnalité
- Utilisez `npm run lint` et `npm run format` avant de proposer une PR
- Documentez vos changements dans le README si besoin

## Processus de contribution
1. Forkez le projet
2. Créez une branche (`feature/ma-fonctionnalite`)
3. Commitez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Poussez la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## Code de conduite
- Soyez respectueux et bienveillant
- Privilégiez la clarté et la qualité du code
- Commentez les parties complexes

Merci pour votre aide à rendre ce projet meilleur ! 

---

### **Prochain composant : Toast (notifications modernes)**

**src/components/Toast.jsx**
```jsx
import React, { useEffect } from 'react';

export default function Toast({ open, message, severity = 'info', onClose }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;
  const colors = {
    info: '#1cc6ff',
    success: '#4fc3f7',
    error: '#fc5c7d',
    warning: '#ffd600'
  };
  return (
    <div style={{
      position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
      background: colors[severity] || '#23234a', color: '#fff', fontWeight: 700,
      fontSize: 18, borderRadius: 16, padding: '16px 36px', boxShadow: '0 4px 24px #0008',
      zIndex: 2000, transition: 'opacity 0.3s', opacity: open ? 1 : 0
    }}>
      {message}
    </div>
  );
}

---

**Dis “la suite” pour le prochain code (intégration Toast dans ChatPage, ou autre composant).** 

---

### **Modifications à apporter à `src/components/LoginRegister.jsx`**

Ajoute en haut du fichier :
```jsx
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
```

Remplace la fonction `handleSubmit` par :
```jsx
const handleSubmit = async e => {
  e.preventDefault();
  try {
    if (tab === 'login') {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat');
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/chat');
    }
  } catch (err) {
    alert('Erreur : ' + err.message);
  }
};
```

---

**Dis “suite” pour la gestion de la déconnexion, ou une autre fonctionnalité Firebase (messages, profil, etc.).** 