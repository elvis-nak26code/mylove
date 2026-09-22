// ============================================================
// NOS SOUVENIRS
// Remplace chaque ligne par un vrai souvenir, sans rien inventer.
// `photo` = chemin d'une image dans /public (ex: "/photos/parc.jpg")
// ou laisse-le à null pour afficher un cadre doré vide.
// `x` et `y` = position de l'étoile dans la galaxie (en % de l'écran).
// ============================================================

export const memories = [
  {
    id: 'souvenir-1',
    star: 'Un souvenir',
    date: '05/03/2023',
    photo: 'p1.jpeg',
    question: 'Tu te souviens de ce moment ?',
    text: '[ÉCRIRE ICI NOTRE SOUVENIR]',
    x: 24,
    y: 28,
  },
  {
    id: 'souvenir-2',
    star: 'Un moment',
    date: '11/03/2023',
    photo: 'p2.jpeg',
    question: 'Cette journée-là, je l’ai gardée intacte.',
    text: '[ÉCRIRE ICI NOTRE MOMENT]',
    x: 72,
    y: 22,
  },
  {
    id: 'souvenir-3',
    star: 'Un sourire',
    date: '01/01/2024',
    photo: 'p3.jpeg',
    question: 'Je revois encore ce sourire.',
    text: '[ÉCRIRE ICI LE SOUVENIR DE SON SOURIRE]',
    x: 48,
    y: 62,
  },
  {
    id: 'souvenir-4',
    star: 'Une journée',
    date: '13/07/2024',
    photo: 'p4.jpeg',
    question: 'Un jour simple, devenu précieux.',
    text: '[ÉCRIRE ICI NOTRE JOURNÉE]',
    x: 82,
    y: 58,
  },
  {
    id: 'souvenir-5',
    star: 'Un regard',
    date: '2023',
    photo: 'p5.jpeg',
    question: 'Et ce regard, ce jour-là…',
    text: '[ÉCRIRE ICI LE SOUVENIR D’UN REGARD]',
    x: 14,
    y: 66,
  },
]

// ------------------------------------------------------------
// L'ÉTOILE DIFFÉRENTE (Interaction 2)
// Toutes les autres sont blanches ; celle-ci sera dorée.
// ------------------------------------------------------------
export const specialStar = {
  id: 'speciale',
  label: '?',
  x: 62,
  y: 42,
  hiddenNote: 'Tu viens de trouver quelque chose que je n’avais pas prévu de te montrer.',
  secret: 'Il y a des choses que je ressens pour toi que je n’arrive même pas à expliquer.',
}

// ------------------------------------------------------------
// L'ÉTOILE QU'ON PEUT DÉPLACER (interaction tactile)
// Glisse-la avec le doigt jusqu'au centre de l'écran.
// ------------------------------------------------------------
export const draggableStar = {
  id: 'a-garder',
  label: '✦',
  x: 50,
  y: 70,
  hint: 'Essaie de la déposer au centre…',
  dropMessage: 'Certaines étoiles n’ont qu’une place : au centre.',
}