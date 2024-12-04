actor meme_world {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
