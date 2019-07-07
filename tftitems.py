#!/usr/bin/env python3
try:
  import readline
except ImportError:
  print('!! Could not import readline. Proceeding without line editing.')
  readline = None


baseitem = {
  's': 'sword',
  'b': 'bow',
  'r': 'rod',
  't': 'tear',
  'v': 'armor',
  'c': 'cloak',
  'e': 'belt',
  'u': 'spatula',
}

items = {
  "Infinity Edge": "Critical Strike damage is increased by 100 percent.",
  "Sword of the Divine": "5 percent chance each second to gain 100 percent crit.",
  "Hextech Gunblade": "Heal 25 percent of damage dealt.",
  "Spear of Shojin": "After casting an ability, recover 15 percent of remaining maximum Mana per attack.",
  "Guardian Angel": "Revive with 500 HP.",
  "The Bloodthirster": "35 percent Lifesteal.",
  "Zeke's Herald": "Allies around you on combat gain 10 percent Attack speed.",
  "Youmuu's Ghostblade": "You are an Assassi",
  "Sword of the Divine": "5 percent chance each second to gain 100 percent crit.",
  "Rapid Firecannon": "Double your attack range. Attacks cannot miss.",
  "Guinsoo's Rageblade": "Gain 5 percent stacking AS on hit. Stacks infinitely.",
  "Stattik Shiv": "Every third attack splashes 100 magic damage.",
  "Phantom Dancer": "Dodge all crits.",
  "Cursed Blade": "Chance to shrink on hit: removes 1 star.",
  "Titanic Hydra": "Attacks deal 10 percent of the wearer's maximum HP as bonus splash damage.",
  "Blade of the Ruined King": "You are a Blademaster.",
  "Hextech Gunblade": "Heals 25% of damage dealt.",
  "Guinsoo's Rageblade": "Gain 3% stacking Attack Speed on hit. Stacks indefinitely.",
  "Rabadon's Deathcap": "Gain 50% Ability Damage.",
  "Luden's Echo": "Deal 100 Splash Damage on ability hit.",
  "Locket of the Iron Solari": "At the start of combat, adjacent allies get 200 Shield.",
  "Ionic Spark": "Enemies take damage whenever they cast a spell.",
  "Morellonomicon": "Spells burn 5% of enemy's max HP per second.",
  "Yummi": "Makes Champion a Sorcerer.",
  "Spear of Shojin": "After casting an ability, recover 15% of remaining maximum Mana per attack.",
  "Stattik Shiv": "Every 3rd attack deals 100 splash magic damage.",
  "Luden's Echo": "Deal 100 splash damage on ability hit.",
  "Seraph's Embrace": "Regain 20 Mana with each spell cast.",
  "Frozen Heart": "Adjacent enemies lose 20% Attack Speed.",
  "Hush": "Attacks have a high chance to Silence.",
  "Redemption": "On death, heal all nearby allies for 1000 HP.",
  "Darkin": "You are a Demon.",
  "Guardian Angel": "Revive with 500HP.",
  "Phantom Dancer": "Dodge all crits.",
  "Locket of the Iron Solari": "On combat start, adjacent allies get 200 shield.",
  "Frozen Heart": "Adjacent enemies lose 20% Attack Speed.",
  "Thornmail": "Reflect 35% of damage taken by attacks.",
  "Sword Breaker": "Attacks have a chance to disarm the enemy.",
  "Red Buff": "Attacks burn for 2.5% of max HP and disable healing.",
  "Knight's Vow": "You are a Knight.",
  "Blood Thirster": "50% Lifesteal.",
  "Cursed Blade": "Small chance to demote enemy unit by one star on hit.",
  "Ionic Spark": "Whenever an enemy casts a spell they take damage.",
  "Hush": "Attacks have a high chance to Silence.",
  "Sword Breaker": "Attacks have a chance to disarm the enemy.",
  "Dragon's Claw": "83% resistance to magic damage.",
  "Zephyr": "Banish an enemy for five seconds on combat start.",
  "Runaan's Hurricane": "Attacks hit up to two extra targets for 50% of normal damage.",
  "Stark's Fervor": "Allies around you on combat begin gain 10% Attack Speed.",
  "Titanic Hydra": "Attacks deal 10% of the wearer's maximum HP as bonus splash damage.",
  "Morellonomicon": "Spells burn 5% of the enemy's max HP per second.",
  "Redemption": "On death, heal all nearby allies for 1000 HP.",
  "Red Buff": "Attacks burn for 2.5% of max HP and disable healing.",
  "Zephyr": "Banish an enemy for five seconds on combat start.",
  "Warmog's Armor": "Regenerate 3% max Health per second.",
  "Frozen Mallet": "The wearer is also a Glacial.",
  "Youmuu's Ghostblade": "You are an Assassin.",
  "Blade of the Ruined King": "You are a Blademaster",
  "Yuumi": "You are a Sorcerer.",
  "Darkin": "You are a Demon.",
  "Knight's Vow": "You are a Knight.",
  "Runaan's Hurricane": "Attacks hit additional enemies which deal 50% of normal damage.",
  "Frozen Mallet": "You are a Glacial.",
  "Force of Nature": "+1 to your unit cap.",
}

combines_ = {
  "ss": "Infinity Edge",
  "sb": "Sword of the Divine",
  "sr": "Hextech Gunblade",
  "st": "Spear of Shojin",
  "sv": "Guardian Angel",
  "sc": "The Bloodthirster",
  "se": "Zeke's Herald",
  "su": "Youmuu's Ghostblade",
  "bs": "Sword of the Divine",
  "bb": "Rapid Firecannon",
  "br": "Guinsoo's Rageblade",
  "bt": "Stattik Shiv",
  "bv": "Phantom Dancer",
  "bc": "Cursed Blade",
  "be": "Titanic Hydra",
  "bu": "Blade of the Ruined King",
  "rs": "Hextech Gunblade",
  "rb": "Guinsoo's Rageblade",
  "rr": "Rabadon's Deathcap",
  "rt": "Luden's Echo",
  "rv": "Locket of the Iron Solari",
  "rc": "Ionic Spark",
  "re": "Morellonomicon",
  "ru": "Yummi",
  "ts": "Spear of Shojin",
  "tb": "Stattik Shiv",
  "tr": "Luden's Echo",
  "tt": "Seraph's Embrace",
  "tv": "Frozen Heart",
  "tc": "Hush",
  "te": "Redemption",
  "tu": "Darkin",
  "vs": "Guardian Angel",
  "vb": "Phantom Dancer",
  "vr": "Locket of the Iron Solari",
  "vt": "Frozen Heart",
  "vv": "Thornmail",
  "vc": "Sword Breaker",
  "ve": "Red Buff",
  "vu": "Knight's Vow",
  "cs": "The Bloodthirster",
  "cb": "Cursed Blade",
  "cr": "Ionic Spark",
  "ct": "Hush",
  "cv": "Sword Breaker",
  "cc": "Dragon's Claw",
  "ce": "Zephyr",
  "cu": "Runaan's Hurricane",
  "es": "Stark's Fervor",
  "eb": "Titanic Hydra",
  "er": "Morellonomicon",
  "et": "Redemption",
  "ev": "Red Buff",
  "ec": "Zephyr",
  "ee": "Warmog's Armor",
  "eu": "Frozen Mallet",
  "us": "Youmuu's Ghostblade",
  "ub": "Blade of the Ruined King",
  "ur": "Yuumi",
  "ut": "Darkin",
  "uv": "Knight's Vow",
  "uc": "Runaan's Hurricane",
  "ue": "Frozen Mallet",
  "uu": "Force of Nature",
}

combines = dict((tuple(sorted(k)),v) for k,v in combines_.items())


# Modified from https://stackoverflow.com/a/21762051
def uniquepairs(l):
  result = set()
  def rec(l, choice):
    if len(l) == 0:
      result.add(tuple(sorted(tuple(sorted(i)) for i in choice)))
    else:
      for j in range(1, len(l)):
        choice1 = choice + [(l[0],l[j])]
        l1 = l[:]
        del l1[j]
        del l1[0]
        rec(l1, choice1)
  rec(l, [])
  return result


def getbaseitem(s, fallback = None):
  return baseitem.get(s.strip(), fallback)


def interactive():
  prompt = '\n{0}\n> '.format(', '.join('{0}={1}'.format(k, v) for k,v in baseitem.items()))
  validchar = ''.join(baseitem.keys())
  while True:
    inpstr = input(prompt)
    inp = list(c for c in inpstr if c in validchar)
    inplen = len(inp)
    if inplen == 0:
      continue
    elif inplen > 8:
      print('!! No sane person has more than 8 items!')
      continue
    elif inplen & 1:
      inp.append(' ')
    result = uniquepairs(inp)
    if len(result) == 0:
      continue
    print('')
    uniqueitems = {}
    for p in sorted(result):
      spare = None
      items = []
      for i in p:
        if i[0] == ' ':
          spare = getbaseitem(i[1])
          continue
        itemname = combines[i]
        componentstr = '+'.join(getbaseitem(''.join(i2)) or '' for i2 in i)
        if spare:
          sparestr = ' (+ {0})'.format(spare)
        else:
          sparestr = ''
        itemstr = '{0:>17}:{1:25}'.format(componentstr, itemname)
        uniqueitems[itemname] = itemstr
        items.append(itemstr)
      print('{0}{1}'.format(' | '.join(items), sparestr))
    print('\n** Possible: {0}'.format(', '.join(x.strip() for x in uniqueitems.values())))


def main():
  interactive()

if __name__ == '__main__':
  main()
