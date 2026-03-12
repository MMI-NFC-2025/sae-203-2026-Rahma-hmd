import { getArtistes } from './backend.mjs'
import { getArtistesByDate } from './backend.mjs'
import { getArtistesAlphabetically } from './backend.mjs'
import { getArtisteById } from './backend.mjs'
import { getScenesByName } from './backend.mjs'
import { getSceneById } from './backend.mjs'
import { getArtistesBySceneId } from './backend.mjs'
import { getArtistesBySceneName } from './backend.mjs'
import { getRepresentations } from './backend.mjs'
import { upsertArtiste } from './backend.mjs'
import { upsertScene } from './backend.mjs'
import { upsertRepresentation } from './backend.mjs'

// ============================================
// TEST: getArtistes - Liste tous les artistes
// ============================================
try {
    const artistes = await getArtistes();
    console.table(artistes);
} catch (e) {
    console.error(e);
}

// ============================================
// TEST: getArtistesByDate - Artistes triés par date de représentation
// ============================================
try {
    const artistes = await getArtistesByDate();
    console.table(artistes);
} catch (e) {
    console.error(e);
}

// ============================================
// TEST: getArtistesAlphabetically - Artistes triés par ordre alphabétique
// ============================================
try {
    const artistes = await getArtistesAlphabetically();
    console.table(artistes);
} catch (e) {
    console.error(e);
}

// ============================================
// TEST: getArtisteById - Infos d'un artiste par son id
// ============================================
try {
    const artiste = await getArtisteById('x5ls8z240tuh7o3');
    console.table(artiste);
} catch (e) {
    console.error(e);
}

// ============================================
// TEST: getScenesByName - Liste des scènes triées par nom
// ============================================
try {
    const scenes = await getScenesByName();
    console.table(scenes);
} catch (e) {
    console.error(e);
}

// ============================================
// TEST: getSceneById - Infos d'une scène par son id
// ============================================
/*try {
    const scene = await getSceneById('o0u4558mkxetudu');
    console.table(scene);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: getArtistesBySceneId - Artistes d'une scène par id de scène
// ============================================
/*try {
    const artistes = await getArtistesBySceneId('o0u4558mkxetudu');
    console.table(artistes);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: getArtistesBySceneName - Artistes d'une scène par nom de scène
// ============================================
/*try {
    const artistes = await getArtistesBySceneName('THÉÂTRE');
    console.table(artistes);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: getRepresentations - Toutes les représentations avec expand
// ============================================
/*try {
    const representations = await getRepresentations();
    console.table(representations);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: upsertArtiste - Ajouter un nouvel artiste
// ============================================
/*try {
    const newArtiste = {
        "nom": "Nouvel Artiste",
        "description": "Description de l'artiste",
        "genre": "musique classique"
    };
    const artiste = await upsertArtiste(newArtiste);
    console.table(artiste);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: upsertArtiste - Modifier un artiste existant
// ============================================
/*try {
    const data = {
        "nom": "Nom modifié",
        "genre": "opéra baroque"
    };
    const artiste = await upsertArtiste(data, 'ID_ARTISTE_ICI');
    console.table(artiste);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: upsertScene - Ajouter une nouvelle scène
// ============================================
/*try {
    const newScene = {
        "nom": "Nouvelle Scène",
        "localisation": "Adresse de la scène",
        "capacite": 500
    };
    const scene = await upsertScene(newScene);
    console.table(scene);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: upsertScene - Modifier une scène existante
// ============================================
/*try {
    const data = {
        "nom": "Nom scène modifié",
        "capacite": 300
    };
    const scene = await upsertScene(data, 'ID_SCENE_ICI');
    console.table(scene);
} catch (e) {
    console.error(e);
}*/

// ============================================
// TEST: upsertRepresentation - Ajouter une représentation
// ============================================
/*try {
    const newRep = {
        "titre_representation": "Nouvelle Représentation",
        "date_heure": "2026-12-25 20:00:00",
        "artiste": "x5ls8z240tuh7o3",
        "scene": "o0u4558mkxetudu"
    };
    const rep = await upsertRepresentation(newRep);
    console.table(rep);
} catch (e) {
    console.error(e);
}*/