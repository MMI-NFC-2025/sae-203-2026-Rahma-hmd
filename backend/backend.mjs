// Importation de la bibliothèque PocketBase
import PocketBase from "pocketbase";

// Définition de l'URL de l'instance PocketBase
const POCKETBASE_URL = "https://festicloze.rahmaproject.fr";

// Création de l'instance PocketBase avec l'URL définie plus haut
const pb = new PocketBase(POCKETBASE_URL);

// Exportation de l'instance PocketBase pour l'utiliser dans d'autres fichiers
export { pb };

// ============================================
// FONCTIONS ARTISTES
// ============================================

// Fonction pour récupérer tous les artistes
export async function getArtistes() {
    try {
        return await pb.collection("artistes").getFullList();
    } catch (error) {
        console.error("Erreur lors de la récupération des artistes :", error);
        return [];
    }
}

// Fonction qui retourne la liste de tous les artistes triés par date de représentation
// avec, pour chacun, sa première date de représentation et la scène correspondante
export async function getArtistesByDate() {
    try {
        // Récupère les représentations triées par date avec l'artiste et la scène associés
        const representations = await pb.collection("representation").getFullList({
            sort: "date_heure",
            expand: "artiste,scene"
        });

        // Extrait les artistes des représentations (en évitant les doublons)
        // et garde pour chacun la première date + scène
        const artistesMap = new Map();
        for (const rep of representations) {
            if (rep.expand?.artiste) {
                const artiste = rep.expand.artiste;
                if (!artistesMap.has(artiste.id)) {
                    artistesMap.set(artiste.id, {
                        ...artiste,
                        firstDate: rep.date_heure,
                        firstScene: rep.expand?.scene || null,
                    });
                }
            }
        }
        return Array.from(artistesMap.values());
    } catch (error) {
        console.error("Erreur lors de la récupération des artistes par date :", error);
        return [];
    }
}

// Fonction qui retourne la liste de tous les artistes triés par ordre alphabétique
export async function getArtistesAlphabetically() {
    try {
        return await pb.collection("artistes").getFullList({
            sort: "nom"
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des artistes par ordre alphabétique :", error);
        return [];
    }
}

// Fonction qui retourne les infos d'un artiste en donnant son id en paramètre
export async function getArtisteById(id) {
    try {
        return await pb.collection("artistes").getOne(id);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'artiste :", error);
        return null;
    }
}

// ============================================
// FONCTIONS SCÈNES
// ============================================

// Fonction qui retourne la liste de toutes les scènes triées par nom
export async function getScenesByName() {
    try {
        return await pb.collection("scene").getFullList({
            sort: "nom"
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des scènes :", error);
        return [];
    }
}

// Fonction qui retourne les infos d'une scène en donnant son id en paramètre
export async function getSceneById(id) {
    try {
        return await pb.collection("scene").getOne(id);
    } catch (error) {
        console.error("Erreur lors de la récupération de la scène :", error);
        return null;
    }
}

// ============================================
// FONCTIONS REPRÉSENTATIONS
// ============================================

// Fonction qui retourne tous les artistes se produisant sur une scène donnée par son id, triés par date
export async function getArtistesBySceneId(sceneId) {
    try {
        const representations = await pb.collection("representation").getFullList({
            filter: `scene = "${sceneId}"`,
            sort: "date_heure",
            expand: "artiste"
        });
        return representations.map(rep => ({
            ...rep.expand?.artiste,
            date_representation: rep.date_heure
        })).filter(Boolean);
    } catch (error) {
        console.error("Erreur lors de la récupération des artistes par scène :", error);
        return [];
    }
}

// Fonction qui retourne tous les artistes se produisant sur une scène donnée par son nom, triés par date
export async function getArtistesBySceneName(sceneName) {
    try {
        // Trouver la scène par son nom exact
        const scenes = await pb.collection("scene").getFullList({
            filter: `nom = "${sceneName}"`
        });
        if (scenes.length === 0) {
            console.warn("Aucune scène trouvée avec ce nom");
            return [];
        }
        // Récupérer les artistes de cette scène
        const sceneId = scenes[0].id;
        return await getArtistesBySceneId(sceneId);
    } catch (error) {
        console.error("Erreur lors de la récupération des artistes par nom de scène :", error);
        return [];
    }
}

// ============================================
// FONCTIONS AJOUT / MODIFICATION
// ============================================

// Fonction qui permet d'ajouter ou modifier les informations d'un artiste
export async function upsertArtiste(data, id = null) {
    try {
        if (id) {
            // Modification d'un artiste existant
            return await pb.collection("artistes").update(id, data);
        } else {
            // Création d'un nouvel artiste
            return await pb.collection("artistes").create(data);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout/modification de l'artiste :", error);
        return null;
    }
}

// Fonction qui permet d'ajouter ou modifier les informations d'une scène
export async function upsertScene(data, id = null) {
    try {
        if (id) {
            // Modification d'une scène existante
            return await pb.collection("scene").update(id, data);
        } else {
            // Création d'une nouvelle scène
            return await pb.collection("scene").create(data);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout/modification de la scène :", error);
        return null;
    }
}

// ============================================
// FONCTIONS REPRÉSENTATIONS (BONUS)
// ============================================

// Fonction pour récupérer toutes les représentations avec artistes et scènes
export async function getRepresentations() {
    try {
        return await pb.collection("representation").getFullList({
            sort: "date_heure",
            expand: "artiste,scene"
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des représentations :", error);
        return [];
    }
}

// Fonction pour ajouter ou modifier une représentation
export async function upsertRepresentation(data, id = null) {
    try {
        if (id) {
            return await pb.collection("representation").update(id, data);
        } else {
            return await pb.collection("representation").create(data);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout/modification de la représentation :", error);
        return null;
    }
}

// ============================================
// FONCTIONS FORMULAIRE CONTACT
// ============================================

// Fonction pour envoyer un message via le formulaire de contact
export async function sendContactMessage(data) {
    try {
        const contactData = {
            nom_expediteur: data.nom_expediteur,
            email_expediteur: data.email_expediteur,
            sujet: data.sujet,
            message: data.message,
            date_envoi: new Date().toISOString()
        };
        return await pb.collection("formulaire_contact").create(contactData);
    } catch (error) {
        console.error("Erreur lors de l'envoi du message de contact :", error);
        return null;
    }
}

