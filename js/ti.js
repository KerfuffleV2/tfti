// Transcrypt'ed from Python, 2019-07-07 13:20:39
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var baseitem = dict ({'s': 'sword', 'b': 'bow', 'r': 'rod', 't': 'tear', 'v': 'armor', 'c': 'cloak', 'e': 'belt', 'u': 'spatula'});
export var itemorder = 'sbrtvceu';
export var bimap = dict ({'s': 0, 'b': 1, 'r': 2, 't': 3, 'v': 4, 'c': 5, 'e': 6, 'u': 7});
export var py_items = dict ({'Infinity Edge': 'Critical Strike damage is increased by 100 percent.', 'Sword of the Divine': '5 percent chance each second to gain 100 percent crit.', 'Hextech Gunblade': 'Heal 25 percent of damage dealt.', 'Spear of Shojin': 'After casting an ability, recover 15 percent of remaining maximum Mana per attack.', 'Guardian Angel': 'Revive with 500 HP.', 'The Bloodthirster': '35 percent Lifesteal.', "Zeke's Herald": 'Allies around you on combat gain 10 percent Attack speed.', "Youmuu's Ghostblade": 'You are an Assassi', 'Sword of the Divine': '5 percent chance each second to gain 100 percent crit.', 'Rapid Firecannon': 'Double your attack range. Attacks cannot miss.', "Guinsoo's Rageblade": 'Gain 5 percent stacking AS on hit. Stacks infinitely.', 'Stattik Shiv': 'Every third attack splashes 100 magic damage.', 'Phantom Dancer': 'Dodge all crits.', 'Cursed Blade': 'Chance to shrink on hit: removes 1 star.', 'Titanic Hydra': "Attacks deal 10 percent of the wearer's maximum HP as bonus splash damage.", 'Blade of the Ruined King': 'You are a Blademaster.', 'Hextech Gunblade': 'Heals 25% of damage dealt.', "Guinsoo's Rageblade": 'Gain 3% stacking Attack Speed on hit. Stacks indefinitely.', "Rabadon's Deathcap": 'Gain 50% Ability Damage.', "Luden's Echo": 'Deal 100 Splash Damage on ability hit.', 'Locket of the Iron Solari': 'At the start of combat, adjacent allies get 200 Shield.', 'Ionic Spark': 'Enemies take damage whenever they cast a spell.', 'Morellonomicon': "Spells burn 5% of enemy's max HP per second.", 'Yummi': 'Makes Champion a Sorcerer.', 'Spear of Shojin': 'After casting an ability, recover 15% of remaining maximum Mana per attack.', 'Stattik Shiv': 'Every 3rd attack deals 100 splash magic damage.', "Luden's Echo": 'Deal 100 splash damage on ability hit.', "Seraph's Embrace": 'Regain 20 Mana with each spell cast.', 'Frozen Heart': 'Adjacent enemies lose 20% Attack Speed.', 'Hush': 'Attacks have a high chance to Silence.', 'Redemption': 'On death, heal all nearby allies for 1000 HP.', 'Darkin': 'You are a Demon.', 'Guardian Angel': 'Revive with 500HP.', 'Phantom Dancer': 'Dodge all crits.', 'Locket of the Iron Solari': 'On combat start, adjacent allies get 200 shield.', 'Frozen Heart': 'Adjacent enemies lose 20% Attack Speed.', 'Thornmail': 'Reflect 35% of damage taken by attacks.', 'Sword Breaker': 'Attacks have a chance to disarm the enemy.', 'Red Buff': 'Attacks burn for 2.5% of max HP and disable healing.', "Knight's Vow": 'You are a Knight.', 'Blood Thirster': '50% Lifesteal.', 'Cursed Blade': 'Small chance to demote enemy unit by one star on hit.', 'Ionic Spark': 'Whenever an enemy casts a spell they take damage.', 'Hush': 'Attacks have a high chance to Silence.', 'Sword Breaker': 'Attacks have a chance to disarm the enemy.', "Dragon's Claw": '83% resistance to magic damage.', 'Zephyr': 'Banish an enemy for five seconds on combat start.', "Runaan's Hurricane": 'Attacks hit up to two extra targets for 50% of normal damage.', "Stark's Fervor": 'Allies around you on combat begin gain 10% Attack Speed.', 'Titanic Hydra': "Attacks deal 10% of the wearer's maximum HP as bonus splash damage.", 'Morellonomicon': "Spells burn 5% of the enemy's max HP per second.", 'Redemption': 'On death, heal all nearby allies for 1000 HP.', 'Red Buff': 'Attacks burn for 2.5% of max HP and disable healing.', 'Zephyr': 'Banish an enemy for five seconds on combat start.', "Warmog's Armor": 'Regenerate 3% max Health per second.', 'Frozen Mallet': 'The wearer is also a Glacial.', "Youmuu's Ghostblade": 'You are an Assassin.', 'Blade of the Ruined King': 'You are a Blademaster', 'Yuumi': 'You are a Sorcerer.', 'Darkin': 'You are a Demon.', "Knight's Vow": 'You are a Knight.', "Runaan's Hurricane": 'Attacks hit additional enemies which deal 50% of normal damage.', 'Frozen Mallet': 'You are a Glacial.', 'Force of Nature': '+1 to your unit cap.'});
export var combines_ = dict ({'ss': 'Infinity Edge', 'sb': 'Sword of the Divine', 'sr': 'Hextech Gunblade', 'st': 'Spear of Shojin', 'sv': 'Guardian Angel', 'sc': 'The Bloodthirster', 'se': "Zeke's Herald", 'su': "Youmuu's Ghostblade", 'bs': 'Sword of the Divine', 'bb': 'Rapid Firecannon', 'br': "Guinsoo's Rageblade", 'bt': 'Stattik Shiv', 'bv': 'Phantom Dancer', 'bc': 'Cursed Blade', 'be': 'Titanic Hydra', 'bu': 'Blade of the Ruined King', 'rs': 'Hextech Gunblade', 'rb': "Guinsoo's Rageblade", 'rr': "Rabadon's Deathcap", 'rt': "Luden's Echo", 'rv': 'Locket of the Iron Solari', 'rc': 'Ionic Spark', 're': 'Morellonomicon', 'ru': 'Yummi', 'ts': 'Spear of Shojin', 'tb': 'Stattik Shiv', 'tr': "Luden's Echo", 'tt': "Seraph's Embrace", 'tv': 'Frozen Heart', 'tc': 'Hush', 'te': 'Redemption', 'tu': 'Darkin', 'vs': 'Guardian Angel', 'vb': 'Phantom Dancer', 'vr': 'Locket of the Iron Solari', 'vt': 'Frozen Heart', 'vv': 'Thornmail', 'vc': 'Sword Breaker', 've': 'Red Buff', 'vu': "Knight's Vow", 'cs': 'The Bloodthirster', 'cb': 'Cursed Blade', 'cr': 'Ionic Spark', 'ct': 'Hush', 'cv': 'Sword Breaker', 'cc': "Dragon's Claw", 'ce': 'Zephyr', 'cu': "Runaan's Hurricane", 'es': "Stark's Fervor", 'eb': 'Titanic Hydra', 'er': 'Morellonomicon', 'et': 'Redemption', 'ev': 'Red Buff', 'ec': 'Zephyr', 'ee': "Warmog's Armor", 'eu': 'Frozen Mallet', 'us': "Youmuu's Ghostblade", 'ub': 'Blade of the Ruined King', 'ur': 'Yuumi', 'ut': 'Darkin', 'uv': "Knight's Vow", 'uc': "Runaan's Hurricane", 'ue': 'Frozen Mallet', 'uu': 'Force of Nature'});
export var combines = null;
export var mkcombines = function () {
	var result = [];
	for (var [k, v] of combines_.py_items ()) {
		result.append (tuple ([tuple (sorted (tuple (k))), v]));
	}
	combines = dict (result);
};
export var uniquepairs = function (l) {
	var result = [];
	var rec = function (l, choice, depth) {
		if (depth > 10) {
			print ('MAXDEPTH', depth);
			return ;
		}
		if (len (l) == 0) {
			var tempresult = [];
			for (var i of choice) {
				tempresult.append (tuple (sorted (i)));
			}
			var retval = tuple (sorted (tempresult));
			if (__in__ (retval, result)) {
				return ;
			}
			result.append (retval);
		}
		else {
			for (var j = 1; j < len (l); j++) {
				var choice1 = choice.__getslice__ (0, null, 1);
				choice1.append (tuple ([l [0], l [j]]));
				var l1 = [];
				for (var x = 1; x < j; x++) {
					l1.append (l [x]);
				}
				for (var x = j + 1; x < len (l); x++) {
					l1.append (l [x]);
				}
				rec (l1, choice1, depth + 1);
			}
		}
	};
	rec (l, [], 0);
	return result;
};
export var getbaseitem = function (s, fallback) {
	if (typeof fallback == 'undefined' || (fallback != null && fallback.hasOwnProperty ("__kwargtrans__"))) {;
		var fallback = null;
	};
	return baseitem.py_get (s.strip (), fallback);
};
export var interactive = function () {
	var prompt = '\n{0}\n> '.format (', '.join ((function () {
		var __accu0__ = [];
		for (var [k, v] of baseitem.py_items ()) {
			__accu0__.append ('{0}={1}'.format (k, v));
		}
		return py_iter (__accu0__);
	}) ()));
	var validchar = ''.join (baseitem.py_keys ());
	while (true) {
		var inpstr = input (prompt);
		var inp = list ((function () {
			var __accu0__ = [];
			for (var c of inpstr) {
				if (__in__ (c, validchar)) {
					__accu0__.append (c);
				}
			}
			return py_iter (__accu0__);
		}) ());
		var inplen = len (inp);
		if (inplen == 0) {
			continue;
		}
		else if (inplen > 8) {
			print ('!! No sane person has more than 8 items!');
			continue;
		}
		else if (inplen & 1) {
			inp.append (' ');
		}
		var result = uniquepairs (inp);
		if (len (result) == 0) {
			continue;
		}
		print ('');
		var uniqueitems = dict ({});
		for (var p of sorted (result)) {
			var spare = null;
			var py_items = [];
			for (var i of p) {
				if (i [0] == ' ') {
					var spare = getbaseitem (i [1]);
					continue;
				}
				var itemname = combines [i];
				var componentstr = '+'.join ((function () {
					var __accu0__ = [];
					for (var i2 of i) {
						__accu0__.append (getbaseitem (''.join (i2)) || '');
					}
					return py_iter (__accu0__);
				}) ());
				if (spare) {
					var sparestr = ' (+ {0})'.format (spare);
				}
				else {
					var sparestr = '';
				}
				var itemstr = '{0:>17}:{1:25}'.format (componentstr, itemname);
				uniqueitems [itemname] = itemstr;
				py_items.append (itemstr);
			}
			print ('{0}{1}'.format (' | '.join (py_items), sparestr));
		}
		print ('\n** Possible: {0}'.format (', '.join ((function () {
			var __accu0__ = [];
			for (var x of uniqueitems.py_values ()) {
				__accu0__.append (x.strip ());
			}
			return py_iter (__accu0__);
		}) ())));
	}
};
export var sih = function (k, v) {
	document.getElementById (k).innerHTML = v;
};
export var TI =  __class__ ('TI', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.py_items = dict ({});
		self.ready = false;
	});},
	get setready () {return __get__ (this, function (self) {
		self.ready = true;
	});},
	get incitem () {return __get__ (this, function (self, i) {
		if (!(self.ready) || sum (self.py_items.py_values ()) > 7) {
			return ;
		}
		var itemcount = self.py_items.py_get (i, 0);
		self.py_items [i] = itemcount + 1;
		self.render ();
	});},
	get decitem () {return __get__ (this, function (self, i) {
		if (!(self.ready)) {
			return ;
		}
		var itemcount = max (self.py_items.py_get (i, 0) - 1, 0);
		self.py_items [i] = itemcount;
		self.render ();
	});},
	get itemstostr () {return __get__ (this, function (self) {
		var result = [];
		for (var k of itemorder) {
			var count = self.py_items.py_get (k, 0);
			if (count > 0) {
				for (var _ = 0; _ < count; _++) {
					result.append (k);
				}
			}
		}
		return ''.join (result);
	});},
	get render () {return __get__ (this, function (self) {
		self.renderitems ();
		self.rendercombinations ();
	});},
	get renderitems () {return __get__ (this, function (self) {
		var result = [];
		for (var iid of list (self.itemstostr ())) {
			var iidx = bimap [iid];
			result.append ('<img src="img/{0}.png" class="del" title="{1}" onclick="ti.ti.decitem(\'{2}\')">'.format (iidx, baseitem [iid], iid));
		}
		sih ('items', ''.join (result));
	});},
	get rendercombinations () {return __get__ (this, function (self) {
		var result = [];
		var itemstr = self.itemstostr ();
		if (len (itemstr) < 2) {
			sih ('combinations', '');
			sih ('buildable', '');
			return ;
		}
		if (len (itemstr) & 1) {
			var itemstr = itemstr + ' ';
		}
		var up = uniquepairs (tuple (itemstr));
		var uniqueitems = dict ({});
		var seen = set ();
		for (var p of sorted (up)) {
			var sk = ''.join ((function () {
				var __accu0__ = [];
				for (var i of p) {
					__accu0__.append (''.join (i));
				}
				return py_iter (__accu0__);
			}) ());
			if (__in__ (sk, seen)) {
				continue;
			}
			seen.add (sk);
			var spare = null;
			for (var i of p) {
				if (i [0] == ' ') {
					var spare = i [1];
					continue;
				}
				uniqueitems [''.join (i)] = 1;
				result.append (self.rendercomponentstr (i [0], i [1]));
			}
			if (spare !== null) {
				result.append ('<img src="img/{0}.png" class="spare" title="{1}">'.format (bimap [spare], getbaseitem (spare)));
			}
			result.append ('<br class="clear"><br>');
		}
		self.renderbuildable (uniqueitems.py_keys ());
		sih ('combinations', ''.join (result));
	});},
	get renderbuildable () {return __get__ (this, function (self, uniqueitems) {
		var result = [];
		for (var c of uniqueitems) {
			result.append (self.rendercomponentstr (c [0], c [1]));
		}
		sih ('buildable', ''.join (result));
	});},
	get rendercomponentstr () {return __get__ (this, function (self, c1, c2) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'c1': var c1 = __allkwargs0__ [__attrib0__]; break;
						case 'c2': var c2 = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var c1idx = bimap [c1];
		var c2idx = bimap [c2];
		if (c1idx > c2idx) {
			var __left0__ = tuple ([c2idx, c1idx]);
			var c1idx = __left0__ [0];
			var c2idx = __left0__ [1];
		}
		var c1name = getbaseitem (c1);
		var c2name = getbaseitem (c2);
		var itemname = combines.py_get (tuple ([c1, c2]), 'ohno');
		var itemtext = py_items.py_get (itemname, 'ahhhhh');
		return '\n      <div class="component">\n        <img src="img/{c1}.png" title="{c1name}" class="minit">\n        <img src="img/{c2}.png" title="{c2name}" class="minib">\n        <img src="img/{c1}{c2}.png" title="{itemname}: {itemtext}" class="component">\n      </div>'.format (__kwargtrans__ ({c1: c1idx, c2: c2idx, c1name: c1name, c2name: c2name, itemname: itemname, itemtext: itemtext}));
	});},
	get mkbuttons () {return __get__ (this, function (self) {
		var result = [];
		for (var iid of list (itemorder)) {
			var iidx = bimap [iid];
			result.append ('<img src="img/{0}.png" class="add" title="{1}" onclick="ti.ti.incitem(\'{2}\')">'.format (iidx, baseitem [iid], iid));
		}
		result.append ('<br>');
		sih ('baseitems', ''.join (result));
	});}
});
mkcombines ();
export var ti = TI ();
ti.mkbuttons ();

//# sourceMappingURL=ti.map