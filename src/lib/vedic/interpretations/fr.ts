import type { Dignity } from '../types';

export const DIGNITY_TEXT_FR: Record<Dignity, { label: string; effect: string; modifier: string }> = {
  exalted: {
    label: 'Exaltation (Uccha)',
    effect: 'au sommet absolu de sa souveraineté, dispensant ses bienfaits les plus élevés avec une plénitude totale',
    modifier: 'Dignité suprême : la planète déploie ses significations avec noblesse, aisance et une éclatante fécondité.',
  },
  own: {
    label: 'En son domicile (Sva-kshetra)',
    effect: 'confortablement établie en son domaine, protégeant et soutenant durablement ses attributions naturelles',
    modifier: 'À l’image du maître en sa demeure : sereine, maîtresse de ses moyens et dispensatrice de fruits stables et durables.',
  },
  moolatrikona: {
    label: 'Moolatrikona',
    effect: 'en son sanctuaire d’activité, hautement fonctionnelle, productive et directrice',
    modifier: 'Lieu de rayonnement par excellence : un peu plus exigeant que le domicile mais garantissant une efficacité maximale.',
  },
  friendly: {
    label: 'Signe ami (Mitra Rashi)',
    effect: 'en terre hospitalière, accueillie avec bienveillance et libre d’exprimer ses dons en harmonie',
    modifier: 'Les fruits positifs se manifestent avec fluidité grâce au soutien naturel du maître du signe.',
  },
  neutral: {
    label: 'Signe neutre (Sama Rashi)',
    effect: 'en terrain mesuré, produisant des effets réguliers modulés par les aspects et maîtres conjoints',
    modifier: 'Ni favorisée ni entravée : le discernement et les autres configurations astrales déterminent l’aboutissement final.',
  },
  enemy: {
    label: 'Signe ennemi (Shatru Rashi)',
    effect: 'en terre hostile, faisant face à des résistances nécessitant persévérance et patience pour se réaliser',
    modifier: 'Comme œuvrer dans un milieu exigeant : les résultats sont acquis au prix d’efforts réfléchis et d’adaptation.',
  },
  debilitated: {
    label: 'Débilité (Neecha)',
    effect: 'au creux de sa vigueur extérieure, appelant un travail d’intériorisation et de transformation spirituelle',
    modifier: 'Épreuve karmique féconde : l’annulation de débilité (Neecha Bhanga) transmute souvent cette vulnérabilité en une force singulière.',
  },
};

export const RETRO_TEXT_FR = {
  label: 'Rétrograde (Vakri)',
  effect: 'Son rayonnement s’intériorise, intensifiant la réflexion sur soi et manifestant ses leçons par des voies profondes et non conventionnelles.',
  modifier: 'En astrologie védique, la rétrogradation confère un surcroît de force d’effort (Cheshta Bala) : ses effets touchent les racines profondes du karma.',
};

export const COMBUST_TEXT_FR = {
  label: 'Combustion (Asta)',
  effect: 'Sous le feu éclatant du Soleil, son rayonnement extérieur s’efface au profit d’une quête spirituelle et d’une fidélité à l’idéal.',
  modifier: 'Les qualités de la planète fusionnent avec la lumière solaire : l’expression égotique cède le pas à une vocation d’âme plus élevée.',
};

export const ASPECT_RECEIVED_FR: Record<string, string> = {
  Sun: 'L’aspect du Soleil confère autorité, clarté de vision, fierté légitime et exigence morale.',
  Moon: 'L’aspect de la Lune diffuse douceur bienveillante, sensibilité intuitive, réceptivité et tendresse.',
  Mars: 'L’aspect de Mars insuffle courage conquérant, détermination sans faille, vigueur motrice et tranchant.',
  Mercury: 'L’aspect de Mercure apporte vivacité d’esprit, discernement analytique, souplesse et éloquence.',
  Jupiter: 'L’aspect de Jupiter dispense bénédiction protectrice, haute sagesse, expansion heureuse et élévation spirituelle.',
  Venus: 'L’aspect de Vénus distille grâce esthétique, harmonie relationnelle, raffinement des sens et douceur de vivre.',
  Saturn: 'L’aspect de Saturne impose discipline réfléchie, maturation patiente, sens du devoir et endurance inébranlable.',
  Rahu: 'L’aspect de Rahu apporte audace novatrice, fascination pour l’inconnu, originalité et ambitions d’avant-garde.',
  Ketu: 'L’aspect de Ketu suscite détachement spirituel, clairvoyance intuitive et dépassement des contingences matérielles.',
};

export const HOUSE_AREA_MAP_FR = [
  'la vitalité, le soi et le rayonnement personnel',
  'la richesse patrimoniale, la parole et l’harmonie familiale',
  'la fratrie, le courage d’entreprendre et la communication',
  'le foyer, la mère, le bonheur intérieur et l’enracinement',
  'l’intelligence créative, la descendance et les mérites passés',
  'la santé, la victoire sur les obstacles et le service dévoué',
  'le mariage, les partenariats d’affaires et la vie à deux',
  'la longévité, les métamorphoses de l’âme et les sciences occultes',
  'la haute sagesse, le dharma, la foi et la providence',
  'la carrière, le statut public, l’autorité et l’accomplissement social',
  'les gains nobles, la réalisation des souhaits et le réseau d’alliances',
  'l’intériorité spirituelle, le détachement, la libération (Moksha) et les voyages lointains',
];

const FR_ORDINALS: Record<number, string> = {
  1: '1re', 2: '2e', 3: '3e', 4: '4e', 5: '5e', 6: '6e',
  7: '7e', 8: '8e', 9: '9e', 10: '10e', 11: '11e', 12: '12e',
};

export function ordinalFr(n: number): string { return FR_ORDINALS[n] || `${n}e`; }
export function houseAreaFr(h: number): string { return HOUSE_AREA_MAP_FR[h - 1] || ''; }

export const PLANET_NAME_FR: Record<string, string> = {
  Sun: 'Soleil', Moon: 'Lune', Mars: 'Mars', Mercury: 'Mercure',
  Jupiter: 'Jupiter', Venus: 'Vénus', Saturn: 'Saturne', Rahu: 'Rahu', Ketu: 'Ketu',
};

export function planetNameFr(p: string): string { return PLANET_NAME_FR[p] || p; }
