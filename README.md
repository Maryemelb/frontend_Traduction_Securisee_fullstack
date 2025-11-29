

## Plateforme de Traduction Sécurisée Fullstack

* **Objective Du projet**

La start-up Marocaine TalAIt, spécialisée dans l’e-commerce, prépare son expansion aux Etats-Unis. 
Alors l'objective c'est de créer une application web fullstack sécurisée reposant sur un backend API et une service externe d’IA pour traduire rapidement les fiches produits et traiter les tickets d'une maniére automatique En remplacement du traductions manuellement qui prend beaucoups de temp et impossible à maintenir à grande échelle.

* **
## Structure du backend

* `Backend_Traduction_Securisee_fullstack/`
    * `db/` (Base de données - connexion + modèles ORM)
        * `database.py` (Connexion DB - SQLAlchemy / moteur)
        * `models.py` (Modèles ORM - tables, relations)
    * `schemas/` (Schémas Pydantic - validation des données)
        * `description.py` (Schéma pour la traduction / description)
        * `users.py` (Schéma pour la gestion des utilisateurs)
    * `.dockerignore` (Règles d'ignorance pour Docker)
    * `.env` (Variables d'environnement sensibles)
    * `.gitignore` (Règles d'ignorance Git)
    * `docker-compose.yml` (Orchestration Docker - API, DB, services)
    * `Dockerfile` (Image Docker du backend)
    * `main.py` (Point d'entrée principal de l'API FastAPI)
    * `requirements.txt` (Dépendances Python)
    * `test_main.py` (Test principal pour l’API)

## Structure du frontend
* `/project-root`
    * `app/` (Racine du Router d'Application)
        * `login/` (Route de connexion)
            * `page.tsx`
        * `register/` (Route d'inscription)
            * `page.tsx`
        * `translate/` (Route de traduction)
            * `page.tsx`
        * `favicon.ico` (Favicon de l'application)
        * `globals.css` (Styles globaux)
        * `layout.tsx` (Mise en page (layout) racine)
        * `page.tsx` (Page d'accueil)
    * `public/` (Fichiers statiques publics)
    * `.dockerignore` (Règles d'ignorance pour Docker)
    * `.env` (Variables d'environnement - non commitées)
    * `.gitignore` (Règles d'ignorance pour Git)
    * `Dockerfile` (Configuration de Docker)
    * `eslint.config.mjs` (Configuration d'ESLint)
    * `next-env.d.ts` (Définitions d'environnement TypeScript pour Next.js)
    * `next.config.ts` (Configuration de Next.js)
    * `package-lock.json` (Fichier de verrouillage - lockfile)
    * `package.json` (Dépendances et scripts du projet)
    * `postcss.config.mjs` (Configuration de PostCSS)
    * `README.md` (Documentation du projet)
    * `tsconfig.json` (Configuration de TypeScript)

## 1.Workflow d’authentification
**1.1 L’objectif du JWT**

L’objectif du JWT (JSON Web Token) est de permettre une authentification et une autorisation sécurisées entre un client et un serveur.
Il permet également de donner accès aux API du serveur aux utilisateurs sans avoir besoin de stocker ou de récupérer les informations de l’utilisateur côté serveur.

**1.2  Comment fonctionne le JWT**

Après l'authentification, le token est créé en utilisant le nom d'utilisateur et l'algorithme de hachage pour encoder les informations. La clé secrète du JWT (jwt_secret_key) est ensuite utilisée pour signer ce token, garantissant son authenticité.

*Création du JWT après authentification*:

     
    `def create_token(user:User_schema):
     payload= {"username": user.username    }
     return jwt.encode(payload, os.getenv('JWT_TOKEN'), algorithm= os.getenv('ALGORITHM'))`

Un JWT se compose de trois parties :

      JWT token = Header + Payload + Signature

*Header* :   Contient l’algorithme de hashage et le type de token (JWT).

*Payload*:   Contient les informations concernant l’utilisateur authentifié :

      payload = {"username": user.username}

*Signature*:   Contient la combinaison encodée du header et du payload, plus la clé secrète utilisée pour signer le token.
La clé secrète n’apparaît pas dans le token et reste uniquement côté serveur.

**1.3 Accès aux endpoints protégés**


1. Le serveur vérifie si un token est présent dans le Bearer Header de la requête.

2. Il récupère le token et vérifie sa validité.

3. Si le token est valide, il est décodé en utilisant l’algorithme de hashage et la clé secrète pour authentifier l’utilisateur et 
permettre l’accès à l’endpoint.

         jwt.decode(token,os.getenv  ('JWT_TOKEN'), algorithms= [os.getenv  ('ALGORITHM')])
## 2.limites du service IA externe

L’application utilise deux modèles de traduction fournis par le service IA externe :

Helsinki-NLP/opus-mt-fr-en (français → anglais)

Helsinki-NLP/opus-mt-en-fr (anglais → français)

**Observations et limites**:

*Temps de réponse élevé* : Ces modèles peuvent prendre plusieurs secondes pour générer une traduction, surtout pour de longs textes.

*Dépendance au service externe* : La vitesse et la disponibilité dépendent du serveur du service IA.

*Sécurité et confidentialité* :  Risque de fuite d’information si les données sont sensibles car elles sont envoyées vers un service externe qu'on ne contrôle 

## 3.instructions pour lancer Docker
1. clonner github folders

📌clonner le backend :

    git clone "https://github.com/Maryemelb/Backend_Traduction_Securisee_fullstack.git"

📌clonner le frontend: 

    git clone "https://github.com/Maryemelb/frontend_Traduction_Securisee_fullstack.git"

2. Naviguer dans le répertoire du backend


3. Construire l’image Docker
    Remplacez <nom_de_l_image> par le nom souhaité.

    Le . indique que Docker utilise le Dockerfile du répertoire actuel.
4. Lancer les conteneurs avec Docker Compose

        docker-compose up --build
5. Accéder à l’API

     Backend : 🔗 http://localhost:8000

     Frontend: : 🔗  http://localhost:3000