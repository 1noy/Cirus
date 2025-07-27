# Chat-changing - Application de Messagerie Moderne

Une application de messagerie moderne, sécurisée et élégante construite avec React et Firebase.

## 🚀 Fonctionnalités

- **Authentification sécurisée** avec Firebase Auth
- **Interface moderne** avec design dark mode
- **Chat en temps réel** avec Firestore
- **Responsive design** pour tous les appareils
- **Notifications toast** pour une meilleure UX
- **Gestion des profils** utilisateur

## 🛠️ Technologies Utilisées

- **React 18** - Framework frontend
- **Firebase** - Backend et authentification
- **React Router** - Navigation
- **Vite** - Build tool moderne
- **Material-UI** - Composants UI
- **Emoji Picker** - Sélection d'emojis

## 📦 Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/chat-changing.git
cd chat-changing
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez Firebase :
   - Créez un projet Firebase
   - Activez Authentication et Firestore
   - Copiez vos clés dans `src/utils/firebase.js`

4. Lancez l'application :
```bash
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run format` - Formate le code avec Prettier

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── Home.jsx        # Page d'accueil
│   ├── LoginRegister.jsx # Authentification
│   ├── ChatPage.jsx    # Interface de chat
│   ├── ProfileSetup.jsx # Configuration du profil
│   ├── ProfilePage.jsx # Page de profil
│   └── Toast.jsx       # Notifications
├── utils/              # Utilitaires
│   └── firebase.js     # Configuration Firebase
├── styles/             # Styles CSS
└── assets/             # Ressources statiques
```

## 🔒 Sécurité

- Authentification Firebase sécurisée
- Validation des données côté client et serveur
- Protection contre les injections
- Gestion sécurisée des sessions

## 🎨 Design

- Interface dark mode moderne
- Animations fluides
- Design responsive
- Palette de couleurs cohérente
- Typographie optimisée

## 📱 Responsive

L'application est entièrement responsive et fonctionne sur :
- Ordinateurs de bureau
- Tablettes
- Smartphones

## 🚀 Déploiement

L'application peut être déployée sur :
- Vercel (recommandé)
- Netlify
- GitHub Pages
- Firebase Hosting

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez le fichier `CONTRIBUTING.md` pour plus d'informations.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Développé avec ❤️ par l'équipe Chat-changing**
