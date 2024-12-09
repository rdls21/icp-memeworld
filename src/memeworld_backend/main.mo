import Array "mo:base/Array";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
/*
Curso de ICP - Motoko
Autor: Ricardo Daniel Lozano Sanchez
Descripción:
  Backend de micro red social donde colegas programadores pueden subir 
  memes relacionados con el desarrollo. 
  Los usuarios registrados pueden subir memes de ocio e informativos y dar like 
  a memes de otros usuarios. los memes se guardan en el servidor frontend,
  mientras que en la blockchain se guarda únicamente el nombre de la imagen. 
*/
actor meme_world {
  // Estructura para un usuario
  // Codigo para iniciar sesion es el ID: se le pedira su id al usuario
  // la siguiente vez que inicie sesion.
  type IDuser = Text;   // ID del Usuario.
  type User = {
    name: Text; // Nombre del usuario.
  };
  // Estructura para el post de un Meme
  type IDmeme = Text;        // ID del meme.
  type Meme = {
    postedBy: Text;  // ID del usuario.
    imageName: Text; // Nombre de la imagen.
    likes: [Text];   // Lista de IDs de usuarios que dieron like.
  };
  // Creacion de Hashmaps
  let users = HashMap.HashMap<IDuser, User>(0, Text.equal, Text.hash);
  let memes = HashMap.HashMap<IDmeme, Meme>(0, Text.equal, Text.hash);
  // Variables para asegurar id's unicos
  var idUser: Int = 0;
  var idMeme: Int = 0;
  // Funciones para generar id´s unicos para memes y usuarios
  func generateIdUser(): Int { idUser += 1; idUser };
  func generateIdMeme(): Int { idMeme += 1; idMeme };
  // Respuesta al hacer operaciones con usuario y meme
  type userRecord = Result.Result<Text, Text>;
  type memeRecord = Result.Result<Text, Text>; 

  // Función para saludar (ejemplo)
  public query func greet(name: Text): async Text {
    return "Bienvenid@, " # name # "!";
  };

  // -- Lógica para almacenar memes y usuarios --
  // Función para registrar un nuevo usuario
  public func registerUser(name: Text): async userRecord {
    let id: Text = Int.toText(generateIdUser());
    let usuario = {
        id;
        name;
    };
    users.put(id, usuario);
    return #ok(id);
  };
  // Función para registrar un nuevo meme
  public func registerMeme(postedBy: Text, imageName: Text): async memeRecord {
    let id: Text = Int.toText(generateIdMeme());
    let likes: [Text] = [];
    let meme = {
      postedBy;
      imageName;
      likes;
    };
    memes.put(id, meme);
    return #ok(id);
  };
  // Iniciar sesion con el ID de usuario
  // In this proyect we use '_' to identify optional variables 
  public func loginWith(id: Text): async userRecord {
    let _user: ?User = users.get(id);
    switch(_user) {
      case(?user) {
        return #ok(user.name);
      };
      case(null){
        return #err("Usuario no encontrado.")
      };
    };
  };
  // Consulta para obtener todos los memes
  public query func loadAllMemes(): async [(Text, Meme)] {
    // Go over all the memes
    let firstStep: Iter.Iter<(IDmeme, Meme)> = memes.entries();
    let secondStep: [(IDuser, Meme)] = Iter.toArray(firstStep);
    return secondStep; // Return the array of memes
  };
  // TODO: Refactor the following code avoid nesting
  // Función para dar like a un meme
  public func likeMemeAs(userID: Text, memeID: Text): async memeRecord {
    // Check if the user exists
    let _user: ?User = users.get(userID);
    // switchUser
    switch(_user) {
      case(?_) {
        let _meme: ?Meme = memes.get(memeID);
        switch(_meme) {
          case(?meme) {
            // Make sure the user hasn´t liked this meme before liking it
            // Has been liked before?
            if (Array.find<Text>(meme.likes, func x = x == userID) == null) {
              let likes = Array.append<Text>(meme.likes, [userID]);
              let updatedMeme = {
                postedBy = meme.postedBy;
                imageName = meme.imageName;
                likes = likes;
              };
              memes.put(memeID, updatedMeme);
              // Meme likeado sounds bad in slanglish
              return #err("Liked Meme")
            } else {
              return #err("User already liked this meme.")
            };
          };
          case(null) {
            return #err("Meme no exencontrado")
          };
        };
      };
      case(null) {
        return #err("Usuario no encontrado.")
      };
    };
  };
  public func deleteLikeAs(userID: Text, memeID: Text): async memeRecord {
    // Check if the user exists
    let _user: ?User = users.get(userID);
    // Switch User
    switch(_user) {
      case(?_) {
        let _meme: ?Meme = memes.get(memeID);
        switch(_meme) {
          case(?meme) {
            // Make sure the user liked this meme before disliking it
            // Has been liked before?
            if (Array.find<Text>(meme.likes, func x = x == userID) != null) {
              // Remove all occurencies of the userID in meme.likes
              let newlikes = Array.filter<Text>(meme.likes, func x = x != userID);
              let updatedMeme = {
                postedBy = meme.postedBy;
                imageName = meme.imageName;
                likes = newlikes;
              };
              memes.put(memeID, updatedMeme);
              // Meme dislikeado sounds bad in slanglish
              return #err("Disliked Meme.")
            } else {
              return #err("User needs to have liked the meme before disliking it.")
            };
          };
          case(null) {
            return #err("Meme no exencontrado.")
          };
        };
      };
      case(null) {
        return #err("Usuario no encontrado.")
      };
    };
  };
};
