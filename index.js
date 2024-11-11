const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Poeple = require('./modele/poeple');
/*const poeple = require('./modele/poeple');*/
const PORT = process.env.PORT || 3000;
const app = express();
require('./dbconnect/dbconfig');



/********************************************************************** */
/*   Créer et sauvegarder un enregistrement d'un modèle:   */
/*
async function createPerson() {
    try {
        const newPerson = new Poeple({
            name: 'Sokhna',
            age: 30,
            favoriteFoods: ['Riz au poisson', 'Mbakhal', 'poisson grillé']
        });
        const data = await newPerson.save();
        console.log('Enregistrement sauvegardé avec succès:', data);
    } catch (err) {
        console.error('Erreur lors de la sauvegarde:', err);
    }
}

createPerson();
*/

/****************************************************************************************/




/*   Créer de nombreux enregistrements avec model.create()   */
/*
async function createMultiplePeople() {
    const arrayOfPeople = [
        {
            name: 'Fatou',
            age: 25,
            favoriteFoods: ['Thiéboudiène', 'Mafé']
        },
        {
            name: 'Moussa',
            age: 40,
            favoriteFoods: ['Couscous', 'Riz au poulet']
        },
        {
            name: 'Ndeye',
            age: 35,
            favoriteFoods: ['Salade', 'Yassa au poulet']
        },
    ];

    try {
        const data = await Poeple.create(arrayOfPeople);
        console.log('Enregistrements multiples sauvegardés avec succès:', data);
    } catch (err) {
        console.error('Erreur lors de la sauvegarde des enregistrements multiples:', err);
    }
}

createMultiplePeople();
*/


/********************************************************************** */



/* Utiliser model.find() pour rechercher dans votre base de données */

//Trouvez toutes les personnes ayant un nom donné, en utilisant Model.find() -> ; [Person]
/*
async function rechercheParNom(name) {
    try {
        const people = await Poeple.find({ name: name });
        if (people.length > 0) {
            console.log(`Personnes trouvées avec le nom ${name}:`, people);
        } else {
            console.log(`Aucune personne trouvée avec le nom ${name}`);
        }
    } catch (err) {
        console.error('Erreur lors de la recherche des personnes:', err);
    }
}


rechercheParNom('Sokhna');*/


/********************************************************************** */


/** recherche avec findOne avec comme cle le type d'alimentation **/
/*

poeple.findOne({
    favoriteFoods:'Mbakhal'
}).then((data)=>console.log(data)).catch((err)=>console.log(err))


/********************************************************************** */


/** Utilisez model.findById() pour rechercher votre base de données par _id **/
/*
poeple.findById({
    _id: '672fe6e5777084b61913980f'
}).then((data) => console.log(data)).catch((err) => console.log(err))
*/
/********************************************************************** */

/**Exécutez des mises à jour classiques en exécutant Find, Edit, puis Save **/
/*
function updatefavoryfood(personId) {
    Poeple.findById(personId)
        .then((poeple) => {
            if (!poeple) {
                console.log("Personne non trouvée");
                return;
            }

            // Ajouter "hamburger" à la liste des aliments préférés
            poeple.favoriteFoods.push("hamburger");

            // Sauvegarder la personne mise à jour
            return poeple.save();
        })
        .then((updatedPerson) => {
            console.log("Personne mise à jour avec succès :", updatedPerson);
        })
        .catch((err) => {
            console.error("Erreur lors de la mise à jour de la personne :", err);
        });
}

updatefavoryfood("672fe6e5777084b61913980f");

*/
/********************************************************************** */

/** mises à jour sur un document à l'aide de model.findOneAndUpdate() */
/*
function updateAgeByName(name) {
    Poeple.findOneAndUpdate(
        { name: name }, 
        { $set: { age: 20 } },
        { new: true }
    )
    .then((updatedPerson) => {
        if (!updatedPerson) {
            console.log("Aucune personne trouvée avec ce nom");
        } else {
            console.log("Personne mise à jour avec succès :", updatedPerson);
        }
    })
    .catch((err) => {
        console.error("Erreur lors de la mise à jour de la personne :", err);
    });
}

updateAgeByName('Moussa');
*/

/********************************************************************** */

/** Supprimer un document à l'aide de model.findByIdAndRemove **/
/*
function deletePersonById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("ID invalide");
        return;
    }

    Poeple.findByIdAndDelete(id)
        .then((deletedDoc) => {
            if (!deletedDoc) {
                console.log("Aucune personne trouvée avec cet ID");
            } else {
                console.log("Personne supprimée avec succès :", deletedDoc);
            }
        })
        .catch((err) => {
            console.error("Erreur lors de la suppression de la personne :", err);
        });
}

deletePersonById("672fe6e5777084b619139810");
*/

/********************************************************************** */
//MongoDB et Mongoose - Supprimer de nombreux documents avec model.remove()
/*
function deletePeopleByName(name) {
    Poeple.deleteMany({ name: name })
        .then((result) => {
            console.log(`${result.deletedCount} personnes supprimées avec succès.`);
        })
        .catch((err) => {
            console.error("Erreur lors de la suppression des personnes :", err);
        });
}

deletePeopleByName('Mary');
*/
/**************************************************************************************/


/** Trouvez des personnes qui aiment les burritos. 
 * Triez-les par nom, limitez les résultats à deux documents et masquez leur âge. 
 * Enchaînez .find(), .sort(), .limit(), .select(), puis .exec(). Passez le rappel done(err, data) à exec(). */


function findPeopleLikeBurritos(done) {
    Poeple.find({ favoriteFoods: 'burritos' })
        .sort({ name: 1 })
        .limit(2)
        .select('-age')
        .then((data) => {
            done(null, data); 
        })
        .catch((err) => {
            done(err, null); 
        });
}

findPeopleLikeBurritos((err, data) => {
    if (err) {
        console.error("Erreur lors de la recherche :", err);
    } else {
        console.log("Personnes trouvées :", data);
    }
});

app.listen(PORT, () => {
    console.log('server is running at http://localhost:3000')
})