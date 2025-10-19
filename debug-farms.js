/**
 * Script de diagnostic pour les farms
 */

const API_URL = 'https://pharmhashv3.calitek-junior.workers.dev'

async function debugFarms() {
  console.log('🔍 Diagnostic des farms...\n')
  
  try {
    // 1. Tester la récupération des farms
    console.log('1. Récupération des farms existantes...')
    const getResponse = await fetch(`${API_URL}/api/farms`)
    console.log('Status:', getResponse.status)
    console.log('Headers:', Object.fromEntries(getResponse.headers.entries()))
    
    if (getResponse.ok) {
      const farms = await getResponse.json()
      console.log('✅ Récupération réussie:', farms.length, 'farms trouvées')
      if (farms.length > 0) {
        console.log('Structure de la première farm:', Object.keys(farms[0]))
      }
    } else {
      const errorText = await getResponse.text()
      console.log('❌ Erreur récupération:', errorText)
    }
    
    console.log('\n2. Test d\'ajout d\'une farm...')
    
    // 2. Tester l'ajout d'une farm
    const testFarm = {
      name: `Test Farm ${Date.now()}`,
      description: 'Farm de test pour diagnostic'
    }
    
    console.log('Données envoyées:', testFarm)
    
    const postResponse = await fetch(`${API_URL}/api/farms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testFarm)
    })
    
    console.log('Status:', postResponse.status)
    console.log('Headers:', Object.fromEntries(postResponse.headers.entries()))
    
    const responseText = await postResponse.text()
    console.log('Réponse brute:', responseText)
    
    if (postResponse.ok) {
      console.log('✅ Ajout réussi!')
    } else {
      console.log('❌ Erreur ajout:', responseText)
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message)
  }
}

debugFarms()