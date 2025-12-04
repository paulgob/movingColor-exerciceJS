# Manipulation du DOM et CSS Grid en JavaScript

Ce projet a pour objectif de manipuler le DOM en JavaScript pur (sans framework) pour construire et animer une interface à partir d’un HTML minimal et d’un fichier de script.

## Fonctionnalités implémentées

### 1. Génération dynamique des titres du header et du footer

- Le script récupère les éléments `<header>` et `<footer>` du document.
- Il crée pour chacun un élément `<h1>` :
  - Dans le header : le texte `"ENTETE"`.
  - Dans le footer : le texte `"PIED DE PAGE"`.
- Les deux titres sont centrés horizontalement (`text-align: center`).

Résultat : la page affiche un en-tête et un pied de page avec des titres générés entièrement en JavaScript.

### 2. Mise en page principale avec flexbox et barre de navigation

- L’élément `<main>` est mis en `display: flex`.
- L’élément `<nav>` à l’intérieur de `<main>` reçoit une largeur de `20vw` (environ 20 % de la largeur de la fenêtre).
- Les autres éléments (les divs de classe `.affichageGrille`) occupent le reste de l’espace grâce au flex.

Résultat : une mise en page avec une colonne de navigation à gauche et plusieurs zones de grille à droite.

### 3. Grilles CSS de taille 100 × 100

- Une fonction utilitaire `getChaineAuto(nb)` génère une chaîne contenant `nb` fois le mot `"auto"` séparé par des espaces, par exemple :
  - `getChaineAuto(3)` → `"auto auto auto"`.
- Deux variables globales :
  - `nc = 100` (nombre de colonnes),
  - `nr = 100` (nombre de lignes).
- Pour chaque élément `.affichageGrille` :
  - `grid-template-columns` est défini avec `getChaineAuto(nc)`,
  - `grid-template-rows` est défini avec `getChaineAuto(nr)`.

Résultat : chaque zone de grille de la page est une grille CSS de 100 colonnes par 100 lignes.

### 4. Changement aléatoire des couleurs des titres et de leurs parents

Une fonction `getRandomColor()` génère une couleur RGB aléatoire.

Pour chaque `<h1>` de la page :

- Au survol du titre (`mouseover`) :
  - La couleur du texte du `<h1>` devient une couleur aléatoire.
- Lorsque la souris quitte l’élément parent du `<h1>` (`mouseleave` sur `h1.parentNode`) :
  - La couleur de fond de ce parent devient aléatoire.

Résultat :  
Les titres réagissent au survol et les zones (header/footer) changent de couleur de fond de manière dynamique lorsque la souris sort de ces zones.

### 5. Ajout dynamique d’éléments dans les grilles et le menu

Une fonction `createElement()` est exécutée à chaque clic sur le bouton `"Ajouter un élément"` présent dans `<nav>`.

Elle réalise les actions suivantes :

1. **Création d’une cellule dans chaque grille :**
   - Pour chaque `.affichageGrille`, un `<div>` est créé et ajouté comme enfant.
   - Tous ces `<div>` partagent la même couleur de fond, générée aléatoirement au début de `createElement()`.

2. **Positionnement centré dans la grille :**
   - Chaque nouveau `<div>` est positionné au centre de la grille :
     - `gridColumnStart = nc / 2`
     - `gridRowStart = nr / 2`
     - `gridColumnEnd = nc / 2 + 1`
     - `gridRowEnd = nr / 2 + 1`
   - Autrement dit, chaque case occupe exactement 1 cellule au centre de la grille.

3. **Création d’un “clone” dans la barre de navigation :**
   - Un second `<div>` (clone visuel) est créé pour être affiché dans le `<nav>`.
   - Il a la même couleur de fond que les éléments de la grille.
   - Sa taille est fixée à 30 × 30 px et il flotte à gauche (`float: left`), créant une sorte de palette/galerie dans la barre latérale.

4. **Suppression synchronisée au double-clic :**
   - Une fonction interne `removeElement()` est définie.
   - Sur double-clic soit :
     - sur le petit carré dans le `nav`,  
     - soit sur le dernier div correspondant dans chaque grille,
   - la fonction supprime :
     - le dernier enfant ajouté dans chaque `.affichageGrille`,
     - ainsi que le carré correspondant dans le `nav`.

Résultat :  
Chaque clic sur le bouton ajoute une “série” de cellules colorées centrées dans chaque grille, ainsi qu’une vignette colorée dans le `nav`. Un double-clic sur ces éléments permet de les supprimer de la grille.
