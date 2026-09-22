// ============================================================
// 5 CHOSES QUE J'AIME CHEZ ELLE
// Les textes `01` à `04` sont personnalisables.
// La carte `05 — Toi` est volontairement fixe.
// ============================================================


export const reasons = [

  {
    id: '01',
    title: 'Ta détermination',
   text: 'J’aime ta détermination, cette façon que tu as de vouloir avancer et de ne pas facilement abandonner, même lorsque les choses deviennent difficiles.',
  },

  {
    id: '02',
    title: 'Ton intelligence',
    text: 'J’admire ta façon de réfléchir, de comprendre les choses et de toujours chercher à aller plus loin. Tu es une femme intelligente, et c’est quelque chose que j’aime énormément chez toi.',
  },

  {
    id: '03',
    title: 'Ta personnalité',
    text: 'J’aime la personne que tu es, avec ton caractère, tes petites habitudes, ta façon de parler et même tes petits défauts. C’est tout cet ensemble qui fait que tu es toi.',
  },

  {
    id: '04',
    title: 'Ton sourire',
    text: 'Ton sourire a quelque chose de spécial. Même dans les moments simples, il arrive à me faire sourire à mon tour et à rendre mes journées un peu plus belles.',
  },

  {
    id: '05',
    title: 'Toi',
    text: 'Parce qu’au fond, toutes les raisons précédentes ramènent à une seule personne : toi.',
  },

]


// ============================================================
// LE MINI-JEU « DEVINE » (Page 4)
// Peu importe la réponse choisie, la conclusion est la même.
// ============================================================
export const guessAnswers = [
  { label: 'Ton sourire', key: 'sourire' },
  { label: 'Ton intelligence', key: 'intelligence' },
  { label: 'Ta personnalité', key: 'personnalite' },
  { label: 'Ta détermination', key: 'determination' },
  { label: 'Tout ce qui fait que tu es toi', key: 'tout' },
]

export const guessReveal = [
  'La vraie réponse ?',
  'C’est l’ensemble.',
  'Je ne suis pas tombé amoureux d’une seule chose chez toi.',
  'Je suis tombé amoureux de toi.',
]