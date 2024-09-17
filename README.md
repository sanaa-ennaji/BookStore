## Brif4: travail collectif

Cahier des charges pour le développement du site e-commerce "BOOKSTORE"

**1. Introduction**

L'objectif de ce cahier des charges est de définir les spécifications pour le développement du site e-commerce "BOOKSTORE". Ce site permettra la vente de livres en ligne. Le site devra être convivial, efficace, et conforme aux dernières normes de développement web.

**2. Description des fonctionnalités**

**2.1. Gestion des Livres**

Un administrateur peut ajouter un livre en utilisant un formulaire dynamique.
Un administrateur peut modifier un livre en utilisant un formulaire dynamique.
Un administrateur peut supprimer un ou plusieurs livres.
Chaque livre est identifié par son ID, ISBN, titre, image, description, prix, quantité en stock, disponibilité, QR code (opionnel),son Auteur un livre appartient à une catégorie.
un auteur est défini par son id, name, spécialité
**2.2. Gestion des Catégories**

Un administrateur peut créer une catégorie de livre en utilisant un formulaire dynamique.
Un administrateur peut modifier une catégorie de livre en utilisant un formulaire dynamique.
Un administrateur peut supprimer une catégorie de livre et tous les livres associés.
Chaque catégorie est identifiée par un ID, un nom et une description.
Un livre appartient à une et une seule catégorie.
une catégorie peut contenir un ou plusieurs livres
**2.3. Panier d'achat pour les Utilisateurs**

Un utilisateur peut ajouter un livre à son panier.
Un utilisateur peut consulter le contenu de son panier.
Un utilisateur peut valider son panier. -Un utilisateur peut vider son panier
Après validation, l'utilisateur peut consulter sa facture au format HTML, qui contient la liste des livres achetés et le montant total à payer.
**2.4. Consultation des Livres**

Les utilisateurs peuvent consulter la liste des livres avec pagination.
Les utilisateurs peuvent consulter la liste des catégories de livres avec pagination.
Les utilisateurs peuvent consulter les livres d'une catégorie spécifique.
Les utilisateurs peuvent rechercher un livre par son ID, ISBN ou d'autres attributs de votre choix.
Les utilisateurs peuvent filtrer les livres par ID, ISBN et d'autres attributs de votre choix.
**2.5. Style et Réactivité**

Utilisation d'un framework de style (par exemple, Bootstrap) pour assurer une interface utilisateur attrayante.
Le site doit être responsive pour une utilisation sur divers appareils et tailles d'écran.
**2.6. Manipulation du DOM et Événements en JavaScript**

Utilisation de JavaScript pour la manipulation du DOM et la gestion des événements pour une expérience utilisateur fluide.
L'utilisation de Regex, de zoning et de wireframes peut être bénéfique pour la conception et le développement du site e-commerce "BOOKSTORE", mais chacun de ces éléments remplit des rôles différents. Voici comment vous pourriez les intégrer dans le projet :

**2.7. Utilisation de Regex**:

Les expressions régulières (Regex) peuvent être utiles pour valider et filtrer les données saisies par les utilisateurs, notamment lors de la recherche de livres ou de la création de catégories.
Vous pouvez utiliser Regex pour vérifier si les numéros ISBN sont au format correct, ou pour effectuer des opérations de recherche plus complexes en utilisant des motifs de recherche spécifiques.
**2.8. Wireframes**:

Avant de commencer le développement, il est recommandé de créer des wireframes. Les wireframes sont des schémas de conception rudimentaires qui représentent la disposition des éléments sur les pages du site. Ils aident à visualiser la structure du site, la disposition des boutons, des formulaires, etc.
Les wireframes sont un outil précieux pour s'assurer que toutes les parties prenantes comprennent comment le site fonctionnera et à quoi il ressemblera avant de passer à la phase de développement.
**2.9. Zoning**:

Le zoning est un aspect de la conception qui consiste à diviser les pages en zones distinctes pour organiser le contenu de manière logique. Par exemple, vous pouvez définir des zones pour les informations du livre, les catégories, le panier d'achat, etc.
Le zoning peut aider à garantir une mise en page claire et intuitive en séparant visuellement les éléments clés du site.
**2.10. Stockage de Données **:

Le site utilisera principalement LocalStorage pour stocker les informations sur les livres, les catégories, les paniers d'achat. L'utilisation de bases de données relationnelles telles que MySQL ou MariaDB est optionnelle.

**3. Exigences techniques**

Le site devra être développé en utilisant technologies web, notamment HTML, CSS, JavaScript, et un framework de style.
Les pages de listes de livres et de catégories doivent être paginées pour une navigation facile.
La recherche de livres doit être efficace, en utilisant des filtres et des requêtes. -les formulaires doivent être dynamiques -des fenêtres pop-up pour les panier ( par exemple). ¬-validation des formulaires -Le site doit être responsif -Le brief est collectif vous travaillez avec GIT et gitHub d'une manière collective
**4. gestion du projet**

-vous utilisez un outil de votre choix pour gérer votre projet

github, Jira, azureDevops ...

Notez bien :

-Pour faciliter la mise en situation nous considérons un utilisateur comme un administrateur pour ne pas attaquer le sujet de sécurité ;)

-Pour déterminer la problématique veuillez voir l'image attribuée au brief et le métier du développement informatique, rapplez vous que l'effet ne peut jamais précéder la cause ;)

-Pour ceux qui vont utiliser une base de données ( optionnelle) c'est pas la peine d'acheter une base de données Mysql lors de votre hébérgement, il suffit d'installer un serveur Mysql et un autre apache pour son partie UI.

-établir un diagrammme de gantt comme planificateur des taches pour chacun
