function Player(name, gender, strength, speed, stamina, skill, img) {
  this.name = name;
  this.image = img;
  this.male = gender;
  this.strength = strength;
  this.speed = speed;
  this.stamina = stamina;
  this.skill = skill;
  this.currentSpeed = this.speed;
  this.currentStamina = this.stamina;
  this.maxStamina = this.stamina;
  this.recovery = Math.floor((this.stamina - 10) / 2) + 1;
  this.attacks = [
    {
      attackSpeed: 0,
      attackType: false,
      weapon: this.primaryWeapon
    }
  ];
  this.defenseSpeed = 0;
  this.fatigue = 0;
  this.wounds = 0;
  this.primaryWeapon = {
    name: "",
    damage: 0,
    weight: 0,
    cost: 0,
    costType: "gp"
  };
  this.secondaryWeapon = {
    name: "",
    damage: 0,
    weight: 0,
    cost: 0,
    costType: "gp"
  };
  this.armor = {
    shield: false,
    type: "",
    strength: 0,
    weight: 0
  };

  this.setSpeed = function() {
    this.currentSpeed = this.speed - Math.floor(this.armor.weight / 30);
    return this.currentSpeed > this.currentStamina
      ? this.currentStamina
      : this.currentSpeed;
  };

  this.setStamina = function() {
    this.currentStamina =
      this.currentStamina - this.fatigue - this.wounds + this.recovery;
    if (this.currentStamina > this.stamina) {
      this.currentStamina = this.stamina;
    }
    this.maxStamina = this.stamina - this.wounds;
    return this.currentStamina > this.maxStamina
      ? this.maxStamina
      : this.currentStamina;
  };
}

module.exports = Player;
