import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Démarrage du déploiement...');

try {
  // Vérifier que nous sommes dans le bon répertoire
  const packageJsonPath = join(__dirname, '..', 'package.json');
  console.log('📦 Vérification du package.json...');

  // Installation des dépendances avec --legacy-peer-deps
  console.log('📦 Installation des dépendances (legacy peer deps)...');
  execSync('npm install --legacy-peer-deps', {
    stdio: 'inherit',
    cwd: join(__dirname, '..')
  });

  // Build du projet
  console.log('🔨 Build du projet...');
  execSync('npm run build', { 
    stdio: 'inherit',
    cwd: join(__dirname, '..')
  });

  console.log('✅ Build terminé avec succès!');

  // Déploiement sur Vercel
  console.log('🚀 Déploiement sur Vercel...');
  execSync('vercel --prod --yes', { 
    stdio: 'inherit',
    cwd: join(__dirname, '..')
  });

  console.log('🎉 Déploiement terminé avec succès!');
  console.log('🌐 Votre application est maintenant en ligne sur https://cirus.com');

} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
} 