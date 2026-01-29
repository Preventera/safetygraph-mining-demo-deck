import { SlideContent, RiskData } from './types';

export const RISK_PROFILES: RiskData[] = [
  { type: 'Silicose / Pneumoconiose', percentage: 32, color: '#ef4444' },
  { type: 'Engins & Véhicules', percentage: 22, color: '#f97316' },
  { type: 'Effondrements', percentage: 18, color: '#facc15' },
  { type: 'Bruit / Surdité', percentage: 15, color: '#3b82f6' },
  { type: 'Gaz & Ventilation', percentage: 8, color: '#10b981' },
  { type: 'Électrique / Explosifs', percentage: 5, color: '#8b5cf6' },
];

export const SLIDES: SlideContent[] = [
  {
    id: 1,
    type: 'title',
    title: 'SafetyGraph Mining — SCIAN 21',
    subtitle: 'Extraction minière | AgenticX5 - Prévention Prédictive par IA',
    bullets: [
      'Analyse de données CNESST/APSM 2016-2023',
      'Explicabilité (XAI) de pointe',
      'Optimisation de la prise de décision'
    ],
    speakerNotes:
      "Bonjour à tous. Bienvenue dans cette présentation de SafetyGraph Mining. Nous allons voir comment passer d'une posture réactive à une posture proactive grâce à l'analyse prédictive.",
    runOfShow: [
      {
        duration: 3,
        timing: "0:00 - 0:20",
        script:
          "SafetyGraph Mining par AgenticX5. On passe du réactif au prédictif en SST minière. Analyse CNESST 2016-2023.",
        actions: ["Pointer le logo", "Highlight 'AgenticX5'"]
      },
      {
        duration: 7,
        timing: "0:00 - 0:45",
        script:
          "Bonjour à tous. Je suis ravi de vous présenter SafetyGraph Mining. Notre solution AgenticX5 analyse 7 ans de données CNESST pour anticiper les accidents avant qu'ils n'arrivent.",
        actions: ["Pointer le titre", "Pointer le sous-titre", "Hover sur les puces"],
        transition:
          "Question: Pourquoi 2023? Réponse: C'est le dernier dataset complet audité."
      },
      {
        duration: 12,
        timing: "0:00 - 1:30",
        script:
          "Bienvenue. Le secteur minier est à un tournant. Avec SafetyGraph Mining, nous utilisons l'IA AgenticX5 non pas pour remplacer vos experts, mais pour leur donner une vision 20/20 sur les risques invisibles. On s'appuie sur le SCIAN 21 pour une précision sectorielle inégalée.",
        actions: ["Pointer le logo", "Zoom sur 'AgenticX5'", "Scroll léger"],
        transition:
          "Question: Est-ce spécifique au Québec? Réponse: Oui, optimisé pour les normes CNESST."
      }
    ]
  },
  {
    id: 2,
    type: 'content',
    title: 'Contexte SST — Secteur Minier Québec',
    bullets: [
      'Dataset robuste : CNESST & APSM (2016-2023)',
      'Dernière mise à jour : Décembre 2023',
      'Enjeu : Taux de fréquence stable mais sévérité élevée',
      'Besoin de ciblage précis des interventions'
    ],
    speakerNotes:
      "Le secteur minier québécois s'appuie sur un dataset consolidé couvrant 7 ans d'historique. L'enjeu est la sévérité des accidents.",
    runOfShow: [
      {
        duration: 3,
        timing: "0:20 - 0:40",
        script:
          "On utilise 7 ans de données CNESST. Le problème : la sévérité des accidents reste trop haute. Il faut cibler.",
        actions: ["Pointer '2016-2023'"]
      },
      {
        duration: 7,
        timing: "0:45 - 1:30",
        script:
          "Le contexte est simple : les taux de fréquence plafonnent, mais la sévérité coûte cher, humainement et financièrement. Notre dataset 2016-2023 est la base de nos prédictions.",
        actions: ["Hover sur 'Sévérité élevée'"],
        transition:
          "Question: Vos données sont à jour? Réponse: Oui, incluant la mise à jour de déc. 2023."
      },
      {
        duration: 12,
        timing: "1:30 - 3:00",
        script:
          "Analysons le terrain. L'APSM et la CNESST fournissent une mine d'or d'informations souvent sous-exploitée. On voit que malgré la technologie, la sévérité ne baisse pas. On a besoin de granularité.",
        actions: ["Pointer 'APSM'", "Scroll sur la slide"],
        transition:
          "Question: Comment traitez-vous les données? Réponse: Anonymisation stricte selon Loi 25."
      }
    ]
  },
  {
    id: 3,
    type: 'chart',
    title: 'Profil de Risques par Type',
    bullets: [
      'Maladies pulmonaires : Risque majeur (32%)',
      'Logistique & Transport : 22% des incidents',
      'Géotechnique : 18% liés aux effondrements'
    ],
    speakerNotes:
      "Regardons la distribution : 32% maladies pulmonaires, 22% engins. C'est le coeur de notre modèle.",
    runOfShow: [
      {
        duration: 3,
        timing: "0:40 - 1:00",
        script: "32% silicose, 22% véhicules. Ce sont nos priorités d'intervention.",
        actions: ["Cliquer sur le graphique", "Zoom sur 'Silicose'"]
      },
      {
        duration: 7,
        timing: "1:30 - 2:30",
        script:
          "Voici la réalité du terrain. Les maladies pulmonaires dominent, suivies des risques mécaniques. SafetyGraph apprend de ces patterns pour prédire les pics de risque.",
        actions: ["Hover sur chaque barre", "Cliquer pour zoomer"],
        transition: "Question: Et le bruit? Réponse: 15%, un risque latent qu'on monitore aussi."
      },
      {
        duration: 12,
        timing: "3:00 - 4:30",
        script:
          "Ce graphique est le 'Who's Who' du risque minier. On note que les effondrements (18%) sont les plus imprévisibles, d'où l'importance de nos modules géotechniques.",
        actions: ["Cliquer pour zoomer", "Hover long sur 'Logistique'", "Pointer '18%'"],
        transition:
          "Question: Différence entre mine ouverte et souterraine? Réponse: Le modèle ajuste les poids selon le type."
      }
    ]
  },
  {
    id: 4,
    type: 'demo',
    title: "DÉMO : Vue d'Ensemble du Dashboard",
    visualType: 'dashboard',
    // ✅ Ajoute une capture (ou remplace par une vidéo / iframe si tu veux)
    media: { kind: 'image', src: '/demo/dashboard.png', alt: 'Dashboard SafetyGraph Mining' },

    // OPTION iframe (si tu veux tenter le live — parfois bloqué par CSP/X-Frame)
    // media: { kind: 'iframe', src: 'https://safetygraph-predictions2-mining.netlify.app/', title: 'SafetyGraph Mining Live' },

    bullets: [
      'Hero section : Overview des indicateurs clés',
      'Évolution du taux de fréquence (Série temporelle)',
      'Alertes en temps réel'
    ],
    speakerNotes:
      "Sur le dashboard, l'indice de confiance est à 92.3%. On voit la tendance sur 7 ans et les alertes météo.",
    runOfShow: [
      {
        duration: 3,
        timing: "1:00 - 1:30",
        script: "Dashboard interactif. Confiance 92.3%. On voit les alertes immédiatement.",
        actions: ["Scroll vers le dashboard", "Pointer '92.3%'"]
      },
      {
        duration: 7,
        timing: "2:30 - 3:45",
        script:
          "Entrons dans l'outil. À gauche, l'indice de performance. En bas, les prévisions ECCC. Tout est centralisé pour le superviseur.",
        actions: ["Scroll dashboard", "Cliquer sur le widget ECCC", "Hover sur 'Indicateurs clés'"],
        transition: "Question: Trop d'alertes? Réponse: Non, filtrage intelligent par sévérité."
      },
      {
        duration: 12,
        timing: "4:30 - 6:30",
        script:
          "C'est ici que la magie opère. Le dashboard fusionne vos données internes avec les données macro. L'indice de 92.3% garantit une fiabilité opérationnelle. Voyez la courbe de fréquence : elle n'est pas juste un historique, elle projette le risque.",
        actions: ["Zoom dashboard", "Pointer 'Série temporelle'", "Scroll lent", "Pointer widget '7 ans'"],
        transition:
          "Question: Temps de mise à jour? Réponse: Temps réel pour les alertes météo, hebdo pour les stats."
      }
    ]
  },
  {
    id: 5,
    type: 'content',
    title: 'Intelligence Explicable (XAI)',
    visualType: 'xai',
    bullets: [
      'Indice de confiance actuel : 92.3%',
      "Facteurs SHAP : Pourquoi l'IA prédit ce risque ?",
      'Variables critiques : Humidité, ancienneté'
    ],
    speakerNotes:
      "Le XAI nous donne les facteurs SHAP. On sait pourquoi le risque monte : ici, c'est l'humidité.",
    runOfShow: [
      {
        duration: 3,
        timing: "1:30 - 1:50",
        script: "XAI : on explique pourquoi. Humidité +12%, Expérience -5%. Transparence totale.",
        actions: ["Cliquer sur le widget XAI", "Pointer 'Humidité'"]
      },
      {
        duration: 7,
        timing: "3:45 - 4:45",
        script:
          "L'IA n'est plus une boîte noire. Le module XAI vous montre que l'humidité augmente le risque de 12% aujourd'hui. C'est exploitable immédiatement.",
        actions: ["Hover sur les barres SHAP", "Zoom sur le module XAI"],
        transition:
          "Question: SHAP, c'est quoi? Réponse: Une méthode mathématique pour quantifier l'apport de chaque variable."
      },
      {
        duration: 12,
        timing: "6:30 - 8:00",
        script:
          "L'explicabilité est la clé de l'adoption. Si le modèle prédit un risque de chute, il vous dit que c'est dû à 40% à l'humidité et 20% à la fatigue thermique de la roche. Vos ingénieurs peuvent alors valider.",
        actions: ["Zoom XAI", "Pointer 'Variables critiques'", "Hover sur barres de risque"],
        transition: "Question: On peut ajouter des variables? Réponse: Oui, via notre API de données locales."
      }
    ]
  },
  {
    id: 6,
    type: 'demo',
    title: 'DÉMO : Analyse des Risques Locaux',
    visualType: 'map',
    // ✅ Ajoute une capture (ou vidéo) ici
    media: { kind: 'image', src: '/demo/map.png', alt: 'Carte des risques et régions minières' },

    bullets: [
      'Régions minières (Abitibi, Nord-du-Québec)',
      'Top métiers à risque par zone',
      'Météo ECCC'
    ],
    speakerNotes:
      "On peut filtrer par région. En Abitibi, on voit les métiers spécifiques en danger selon la météo ECCC.",
    runOfShow: [
      {
        duration: 3,
        timing: "1:50 - 2:10",
        script: "Vue régionale. Abitibi : risque accru pour les foreurs aujourd'hui.",
        actions: ["Cliquer sur la carte", "Select Abitibi"]
      },
      {
        duration: 7,
        timing: "4:45 - 5:45",
        script:
          "La géographie compte. En cliquant sur l'Abitibi, le profil change. La météo ECCC est intégrée pour prévenir les risques climatiques de surface.",
        actions: ["Cliquer carte", "Hover métiers", "Pointer icône météo"],
        transition: "Question: Et le Nunavik? Réponse: Couvert aussi avec stations dédiées."
      },
      {
        duration: 12,
        timing: "8:00 - 9:30",
        script:
          "Notre carte interactive permet aux gestionnaires régionaux de comparer les sites. Si une tempête arrive au Nord-du-Québec, les alertes s'ajustent pour les métiers de transport.",
        actions: ["Select Nord-du-Québec", "Cliquer icône map", "Hover 'Top Métiers'", "Pointer widget ECCC"],
        transition: "Question: Intégration SIG? Réponse: Export JSON/CSV disponible."
      }
    ]
  },
  {
    id: 7,
    type: 'content',
    title: "Cas d'usage : Planification Préventive",
    bullets: [
      "Ajustement des tournées d'inspection",
      'Priorisation des formations SST',
      'Validation obligatoire par ingénieur'
    ],
    speakerNotes:
      "L'outil sert à planifier les inspections. On cible les zones rouges en priorité.",
    runOfShow: [
      {
        duration: 3,
        timing: "2:10 - 2:30",
        script: "Usage : ciblez vos inspections. Optimisez votre temps sur le terrain.",
        actions: ["Pointer 'Ajustement tournées'"]
      },
      {
        duration: 7,
        timing: "5:45 - 6:30",
        script:
          "Le superviseur utilise ces données pour ses tournées VPO. Plus de hasard, on inspecte là où l'IA voit un danger latent.",
        actions: ["Hover 'Planification'"],
        transition: "Question: Ça remplace l'humain? Réponse: Non, ça oriente l'humain."
      },
      {
        duration: 12,
        timing: "9:30 - 10:30",
        script:
          "Imaginez vos meetings de relève. Vous ouvrez SafetyGraph, vous voyez les alertes et vous assignez les inspecteurs en conséquence. C'est l'amélioration continue version 4.0.",
        actions: ["Scroll sur les puces", "Pointer 'Meetings de relève'"],
        transition: "Question: ROI? Réponse: Diminution des coûts indirects de 15% en moyenne."
      }
    ]
  },
  {
    id: 8,
    type: 'content',
    title: 'Avertissements & Limites',
    visualType: 'warning',
    bullets: [
      'Outil indicatif uniquement',
      'Validation humaine STRICTEMENT obligatoire',
      'Ne remplace pas les protocoles'
    ],
    speakerNotes:
      "C'est une boussole, pas un pilote automatique. L'humain garde le dernier mot.",
    runOfShow: [
      { duration: 3, timing: "2:30 - 2:40", script: "L'IA conseille, l'humain décide. Toujours.", actions: ["Zoom sur Warning"] },
      {
        duration: 7,
        timing: "6:30 - 6:45",
        script:
          "Rappel crucial : SafetyGraph est un outil d'aide à la décision. L'expertise de vos ingénieurs reste primordiale.",
        actions: ["Pointer le triangle rouge"],
        transition: "Question: Responsabilité légale? Réponse: L'outil est un support, les protocoles SST font foi."
      },
      {
        duration: 12,
        timing: "10:30 - 11:00",
        script:
          "Nous insistons sur l'éthique. L'IA peut se tromper ou manquer de contexte local. La validation humaine est le garde-fou obligatoire de notre système.",
        actions: ["Zoom Warning", "Hover avertissement"],
        transition:
          "Question: Que faire en cas de divergence IA/Humain? Réponse: Toujours suivre l'humain et documenter via le module feedback."
      }
    ]
  },
  {
    id: 9,
    type: 'cta',
    title: 'Conclusion & Prochaines Étapes',
    bullets: [
      'Objectif : Zéro incident mortel',
      'Essai pilote de 30 jours',
      'Contact : team@agenticx5.com'
    ],
    speakerNotes:
      "Merci. Testons l'app sur votre site. Contactez-nous pour un pilote.",
    runOfShow: [
      {
        duration: 3,
        timing: "2:40 - 3:00",
        script:
          "Zéro incident mortel. Pilote de 30 jours disponible. Contactez team@agenticx5.com.",
        actions: ["Cliquer sur le bouton CTA"]
      },
      {
        duration: 7,
        timing: "6:45 - 7:00",
        script:
          "Visons le zéro incident. Je vous invite à essayer la plateforme pendant 30 jours sans engagement. Merci.",
        actions: ["Pointer e-mail", "Pointer URL app"],
        transition: "Question: Coût du pilote? Réponse: Inclus dans notre programme découverte."
      },
      {
        duration: 12,
        timing: "11:00 - 12:00",
        script:
          "Le futur de la mine est prédictif. Ne subissez plus les statistiques, créez-les. Rejoignez nos partenaires pilotes et sauvons des vies ensemble. Merci pour votre temps.",
        actions: ["Zoom bouton CTA", "Pointer contact", "Pointer lien application"],
        transition: "Question: Support technique? Réponse: 24/7 pour les clients Platinum."
      }
    ]
  }
];
