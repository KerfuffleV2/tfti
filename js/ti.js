// Transcrypt'ed from Python, 2019-07-28 06:58:40
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var SCORE_THRESHOLD = 3;
export var COMPONENT = tuple (['B.F. Sword: +20 attack damage', 'Recurve Bow: +20% attack speed', 'Needlessly Large Rod: +20% spell damage', 'Tear of the Goddess: +20 starting mana', 'Chain Vest: +20 armor', 'Negatron Cloak: +20 magic resist', "Giant's belt: +200 health", 'Spatula']);
export var itemsj = ITEMS;
export var Item =  __class__ ('Item', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, itemj) {
		self.combine = itemj ['comp'];
		self.text = itemj ['desc'];
		self.py_name = itemj ['name'];
		self.score = itemj ['score'];
	}, '__init__');},
	get __str__ () {return __get__ (this, function (self) {
		return '<Item combine={0} score={1} name=[{2}] text=[{3}]'.format (self.combine, self.score, self.py_name, self.text);
	}, '__str__');}
});
export var Items =  __class__ ('Items', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.bycombine = dict ({});
		self.byname = dict ({});
		for (var itemj of itemsj) {
			var item = Item (itemj);
			self.bycombine [item.combine] = item;
			self.byname [item.py_name] = item;
		}
	}, '__init__');}
});
export var mkcombinations = function (l) {
	var result = [];
	var seen = set ();
	var rec = function (l, choice) {
		if (len (l) == 0) {
			var tempresult = [];
			var spare = null;
			for (var i of choice) {
				var i = sorted (i);
				if (i [0] == ' ') {
					var spare = i [1];
					continue;
				}
				tempresult.append (''.join (i));
			}
			tempresult.py_sort ();
			var sk = ''.join (tempresult);
			if (__in__ (sk, seen)) {
				return ;
			}
			seen.add (sk);
			var retval = list ((function () {
				var __accu0__ = [];
				for (var k of tempresult) {
					__accu0__.append (py_items.bycombine [k]);
				}
				return py_iter (__accu0__);
			}) ());
			result.append (tuple ([retval, spare]));
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
				rec (l1, choice1);
			}
		}
	};
	rec (l, []);
	return result;
};
export var sih = function (k, v) {
	document.getElementById (k).innerHTML = v;
};
export var UIPrefs =  __class__ ('UIPrefs', [object], {
	__module__: __name__,
	themes: tuple (['Dark', 'Light']),
	iconsizes: tuple ([tuple (['Medium', '0.75']), tuple (['Large', '1.0']), tuple (['Small', '0.5'])]),
	defaultprefs: dict ({'ver': 0, 'theme': 0, 'iconsize': 0, 'showsection': dict ({'oneoff': 1, 'combinations': 1})}),
	get __init__ () {return __get__ (this, function (self) {
		self.prefs = self.defaultprefs;
		self.load ();
	}, '__init__');},
	get load () {return __get__ (this, function (self) {
		var dprefs = self.defaultprefs;
		var prefsj = localStorage.getItem ('prefs');
		if (prefsj !== null) {
			var prefs = dict (JSON.parse (prefsj));
		}
		else {
			var prefs = deepcopy (dprefs);
			self.migrate (prefs);
		}
		prefs ['showsection'] = dict (prefs ['showsection']);
		prefs ['iconsize'] = __mod__ (max (0, prefs ['iconsize']), len (self.iconsizes));
		prefs ['theme'] = __mod__ (max (0, prefs ['theme']), len (self.themes));
		self.seticonsize (prefs ['iconsize']);
		self.settheme (prefs ['theme']);
		for (var [k, v] of prefs ['showsection'].py_items ()) {
			self.setshowsection (k, v);
		}
		self.prefs = prefs;
	}, 'load');},
	get save () {return __get__ (this, function (self) {
		localStorage.setItem ('prefs', JSON.stringify (self.prefs));
	}, 'save');},
	get migrate () {return __get__ (this, function (self, prefs) {
		var loadiconsize = function () {
			try {
				var iconsizestr = localStorage.getItem ('iconsize');
				if (iconsizestr !== null) {
					var iconsznum = __mod__ (max (0, int (iconsizestr)), len (self.iconsizes));
					prefs ['iconsize'] = iconsznum;
				}
			}
			catch (__except0__) {
				// pass;
			}
		};
		var loadtheme = function () {
			try {
				var themestr = localStorage.getItem ('theme');
				if (themestr !== null) {
					var themenum = __mod__ (max (0, int (themestr)), len (self.themes));
					prefs ['theme'] = themenum;
				}
			}
			catch (__except0__) {
				// pass;
			}
		};
		loadiconsize ();
		loadtheme ();
		localStorage.removeItem ('iconsize');
		localStorage.removeItem ('theme');
	}, 'migrate');},
	get toggleshowsection () {return __get__ (this, function (self, secname) {
		var shown = self.prefs ['showsection'].py_get (secname, self.defaultprefs ['showsection'].py_get (secname, 1));
		var nshown = (shown == 0 ? 1 : 0);
		self.setshowsection (secname, nshown);
	}, 'toggleshowsection');},
	get setshowsection () {return __get__ (this, function (self, secname, shown) {
		var old = self.prefs ['showsection'] [secname];
		var attrname = 'data-hide-' + secname;
		if (shown) {
			document.documentElement.removeAttribute (attrname);
		}
		else {
			document.documentElement.setAttribute (attrname, 1);
		}
		sih ('show' + secname, (shown == 0 ? 'Off' : 'On'));
		if (old == shown) {
			return ;
		}
		self.prefs ['showsection'] [secname] = shown;
		self.save ();
	}, 'setshowsection');},
	get toggleiconsize () {return __get__ (this, function (self) {
		var iconsznum = __mod__ (self.iconsize + 1, len (self.iconsizes));
		self.seticonsize (iconsznum);
	}, 'toggleiconsize');},
	get seticonsize () {return __get__ (this, function (self, iconsznum) {
		var old = self.iconsize;
		self.iconsize = iconsznum;
		var __left0__ = self.iconsizes [iconsznum];
		var sizename = __left0__ [0];
		var scale = __left0__ [1];
		document.documentElement.style.setProperty ('--icon-scale', scale);
		sih ('iconsize', sizename);
		if (old == iconsznum) {
			return ;
		}
		self.prefs ['iconsize'] = iconsznum;
		self.save ();
	}, 'seticonsize');},
	get toggletheme () {return __get__ (this, function (self) {
		var themenum = __mod__ (self.theme + 1, len (self.themes));
		self.settheme (themenum);
	}, 'toggletheme');},
	get settheme () {return __get__ (this, function (self, themenum) {
		var old = self.theme;
		var themename = self.themes [themenum];
		self.theme = themenum;
		document.documentElement.setAttribute ('data-theme', themename.lower ());
		sih ('theme', themename);
		if (old == themenum) {
			return ;
		}
		self.prefs ['theme'] = themenum;
		self.save ();
	}, 'settheme');}
});
export var Components =  __class__ ('Components', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.py_clear ();
		var compstr = localStorage.getItem ('items');
		if (compstr !== null) {
			for (var cid of compstr) {
				self.modify (cid, 1);
			}
		}
		self.sync ();
	}, '__init__');},
	get py_get () {return __get__ (this, function (self, cid) {
		return self.components.py_get (cid, 0);
	}, 'get');},
	get py_clear () {return __get__ (this, function (self) {
		self.dirty = false;
		self.components = dict ({});
		self.uniqueitems = dict ({});
		self.combinations = [];
	}, 'clear');},
	get sync () {return __get__ (this, function (self) {
		if (!(self.dirty)) {
			return ;
		}
		self.dirty = false;
		var componentstr = self.tocomponentstr ();
		if (len (componentstr) < 2) {
			self.uniqueitems = dict ({});
			self.combinations = [];
			return ;
		}
		if (len (componentstr) & 1) {
			var componentstr = componentstr + ' ';
		}
		var up = mkcombinations (tuple (componentstr));
		var uniqueitems = dict ({});
		var result = [];
		for (var [pi, spare] of sorted (up, __kwargtrans__ ({reverse: true, key: (function __lambda__ (ps) {
			return sum ((function () {
				var __accu0__ = [];
				for (var i of ps [0]) {
					__accu0__.append (i.score);
				}
				return py_iter (__accu0__);
			}) ());
		})}))) {
			var pi = list (sorted (pi, __kwargtrans__ ({reverse: true, key: (function __lambda__ (i) {
				return tuple ([i.score, i.py_name]);
			})})));
			result.append (tuple ([pi, spare]));
			for (var thisitem of pi) {
				uniqueitems [thisitem.combine] = thisitem;
			}
		}
		self.uniqueitems = uniqueitems;
		self.combinations = result;
	}, 'sync');},
	get modify () {return __get__ (this, function (self, cid, amt) {
		var cid = int (cid);
		var componentcount = self.py_get (cid);
		var newcount = max (0, componentcount + amt);
		self.components [cid] = newcount;
		if (newcount != componentcount) {
			self.dirty = true;
		}
	}, 'modify');},
	get py_values () {return __get__ (this, function (self) {
		return self.components.py_values ();
	}, 'values');},
	get tocomponentstr () {return __get__ (this, function (self) {
		var result = [];
		for (var cid = 0; cid < 8; cid++) {
			var count = self.py_get (cid);
			if (count > 0) {
				for (var _ = 0; _ < count; _++) {
					result.append (str (cid));
				}
			}
		}
		return ''.join (result);
	}, 'tocomponentstr');}
});
export var Templates =  __class__ ('Templates', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.templates = dict ({});
	}, '__init__');},
	get py_get () {return __get__ (this, function (self, k) {
		var k = 'template-' + k;
		var tmpl = self.templates.py_get (k, null);
		if (tmpl === null) {
			var newtmpl = document.getElementById (k);
			if (hasattr (newtmpl, 'innerHTML')) {
				var tmpl = tuple ([newtmpl.innerHTML]);
			}
			else {
				var tmpl = tuple ([null]);
			}
		}
		if (tmpl [0] === null) {
			return '!!TEMPLATE MISSING!!';
		}
		return tmpl [0];
	}, 'get');}
});
export var TI =  __class__ ('TI', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.uipref = UIPrefs ();
		self.components = Components ();
		self.template = Templates ();
		self.wantedprofile = ''.join (['wanted', window.location.hash || '']);
		var wantedstr = localStorage.getItem (self.wantedprofile);
		if (wantedstr !== null) {
			self.wanted = set (wantedstr.py_split (','));
		}
		else {
			self.wanted = set ();
		}
		self.combinationfilter = null;
		self.oneofffilter = null;
		self.ready = false;
	}, '__init__');},
	get setready () {return __get__ (this, function (self) {
		self.ready = true;
		self.render ();
	}, 'setready');},
	get clearitems () {return __get__ (this, function (self) {
		if (!(self.ready)) {
			return ;
		}
		self.components.py_clear ();
		self.components.sync ();
		self.render ();
	}, 'clearitems');},
	get inccomp () {return __get__ (this, function (self, cid) {
		if (!(self.ready) || sum (self.components.py_values ()) > 7) {
			return ;
		}
		self.components.modify (cid, 1);
		self.components.sync ();
		self.render ();
	}, 'inccomp');},
	get deccomp () {return __get__ (this, function (self, cid) {
		if (!(self.ready)) {
			return ;
		}
		self.components.modify (cid, -(1));
		self.components.sync ();
		self.render ();
	}, 'deccomp');},
	get decitem () {return __get__ (this, function (self, fi) {
		if (!(self.ready)) {
			return ;
		}
		self.components.modify (fi [0], -(1));
		self.components.modify (fi [1], -(1));
		self.components.sync ();
		self.render ();
	}, 'decitem');},
	get render () {return __get__ (this, function (self) {
		var go = function () {
			self.rendercomponents ();
			self.renderwanted ();
			self.renderbuildable ();
			self.renderoneoff ();
			self.rendercombinations ();
			requestAnimationFrame (self.fixtooltips);
		};
		requestAnimationFrame (go);
	}, 'render');},
	get setwanted () {return __get__ (this, function (self, thisarg) {
		if (len (self.wanted) >= 16) {
			return ;
		}
		self.wanted.add (thisarg.value);
		thisarg.value = '';
		self.renderwanted ();
		self.fixtooltips ();
	}, 'setwanted');},
	get delwanted () {return __get__ (this, function (self, c) {
		self.wanted.remove (c);
		self.renderwanted ();
		self.fixtooltips ();
	}, 'delwanted');},
	get setcombfilter () {return __get__ (this, function (self, filt) {
		self.combinationfilter = filt;
		var tmpl = self.template.py_get ('combfilter');
		sih ('combinationsfilter', tmpl.format (__kwargtrans__ ({combine: filt})));
		self.rendercombinations ();
		self.fixtooltips ();
	}, 'setcombfilter');},
	get clearcombfilter () {return __get__ (this, function (self) {
		self.combinationfilter = null;
		sih ('combinationsfilter', '');
		self.rendercombinations ();
		self.fixtooltips ();
	}, 'clearcombfilter');},
	get setoneofffilter () {return __get__ (this, function (self, filt) {
		if (filt == self.oneofffilter) {
			self.clearoneofffilter ();
			return ;
		}
		self.oneofffilter = filt;
		var tmpl = self.template.py_get ('oneofffilter');
		sih ('oneofffilter', tmpl.format (__kwargtrans__ ({component: filt})));
		self.renderoneoff ();
		self.fixtooltips ();
	}, 'setoneofffilter');},
	get clearoneofffilter () {return __get__ (this, function (self) {
		self.oneofffilter = null;
		sih ('oneofffilter', '');
		self.renderoneoff ();
		self.fixtooltips ();
	}, 'clearoneofffilter');},
	get mkwantedoptions () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var tmpl = self.template.py_get ('wanted-option');
		var sitems = sorted (py_items.bycombine.py_values (), __kwargtrans__ ({key: (function __lambda__ (i) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'i': var i = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return i.py_name;
		})}));
		var result = ['<option></option>'];
		for (var item of sitems) {
			result.append (tmpl.format (__kwargtrans__ ({combine: item.combine, itemname: item.py_name})));
		}
		sih ('wantedselect', ''.join (result));
	}, 'mkwantedoptions');},
	get rendercomponents () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var result = [];
		var componentstr = self.components.tocomponentstr ();
		if (len (componentstr) > 0) {
			localStorage.setItem ('items', componentstr);
		}
		else {
			localStorage.removeItem ('items');
		}
		var tmpl = self.template.py_get ('owned-components');
		for (var cid of list (componentstr)) {
			result.append (tmpl.format (__kwargtrans__ ({cid: cid, text: COMPONENT [int (cid)]})));
		}
		sih ('items', ''.join (result));
	}, 'rendercomponents');},
	get rendercombinations () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var result = [];
		if (len (self.components.tocomponentstr ()) < 2) {
			sih ('combinations', '');
			sih ('buildable', '');
			self.renderoneoff ();
			return ;
		}
		var tmpl = self.template.py_get ('spare');
		for (var [pi, spare] of self.components.combinations) {
			if (self.combinationfilter !== null && !(any ((function () {
				var __accu0__ = [];
				for (var i of pi) {
					__accu0__.append (i.combine == self.combinationfilter);
				}
				return py_iter (__accu0__);
			}) ()))) {
				continue;
			}
			result.append ('<div class="combinationscontainer">');
			for (var thisitem of pi) {
				result.append (self.mkcomponentstr (thisitem.combine [0], thisitem.combine [1], __kwargtrans__ ({imgclass: (thisitem.score < SCORE_THRESHOLD ? 'lowscore' : ''), imgextra: 'onclick="ti.ti.setcombfilter(\'{0}\')"'.format (thisitem.combine)})));
			}
			if (spare !== null) {
				result.append (tmpl.format (__kwargtrans__ ({sparecid: spare, text: COMPONENT [int (spare)]})));
			}
			result.append ('</div>');
		}
		sih ('combinations', ''.join (result));
	}, 'rendercombinations');},
	get renderbuildable () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var uniqueitems = self.components.uniqueitems;
		var result = [];
		for (var item of sorted (uniqueitems.py_values (), __kwargtrans__ ({reverse: true, key: (function __lambda__ (i) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'i': var i = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return i.score;
		})}))) {
			var c = item.combine;
			result.append (self.mkcomponentstr (c [0], c [1], __kwargtrans__ ({imgextra: 'onclick="ti.ti.decitem(\'{0}\')"'.format (c), imgclass: (item.score < SCORE_THRESHOLD ? 'lowscore' : '')})));
		}
		sih ('buildable', ''.join (result));
	}, 'renderbuildable');},
	get renderwanted () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (len (self.wanted) > 0) {
			localStorage.setItem (self.wantedprofile, ','.join (self.wanted));
		}
		else {
			localStorage.removeItem (self.wantedprofile);
		}
		var result = [];
		for (var c of self.wanted) {
			if (c [0] == c [1]) {
				var havec = self.components.py_get (int (c [0]));
				var c1buildable = havec > 0;
				var __left0__ = havec > 1;
				var c2buildable = __left0__;
				var buildable = __left0__;
			}
			else {
				var c1buildable = self.components.py_get (int (c [0])) > 0;
				var c2buildable = self.components.py_get (int (c [1])) > 0;
				var buildable = c1buildable && c2buildable;
			}
			result.append (self.mkcomponentstr (c [0], c [1], __kwargtrans__ ({minitclass: (!(c1buildable) ? 'showunbuildable' : ''), minibclass: (!(c2buildable) ? 'showunbuildable' : ''), imgclass: (!(buildable) ? 'showunbuildable' : ''), imgextra: 'onclick=\'ti.ti.delwanted("{0}")\''.format (c)})));
		}
		sih ('wanted', ''.join (result));
	}, 'renderwanted');},
	get renderoneoff () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var uniqueitems = self.components.uniqueitems;
		var oof = self.oneofffilter;
		var oneoff = [];
		for (var cid1c = 0; cid1c < 8; cid1c++) {
			var havec1 = self.components.py_get (cid1c);
			if (havec1 == 0) {
				continue;
			}
			for (var cid2c = 0; cid2c < 8; cid2c++) {
				var havec2 = self.components.py_get (cid2c);
				var cid1 = cid1c;
				var cid2 = cid2c;
				var currhavec1 = havec1;
				if (cid1 > cid2) {
					var __left0__ = tuple ([cid2, cid1]);
					var cid1 = __left0__ [0];
					var cid2 = __left0__ [1];
					var __left0__ = tuple ([havec2, currhavec1]);
					var currhavec1 = __left0__ [0];
					var havec2 = __left0__ [1];
				}
				var ck = ''.join (tuple ([str (cid1), str (cid2)]));
				if (__in__ (ck, uniqueitems)) {
					continue;
				}
				if (cid1 == cid2) {
					if (currhavec1 > 1) {
						continue;
					}
					var c1buildable = true;
					var c2buildable = false;
				}
				else {
					var c1buildable = currhavec1 > 0;
					var c2buildable = havec2 > 0;
					if (c1buildable && c2buildable) {
						continue;
					}
				}
				oneoff.append (tuple ([c1buildable, c2buildable, py_items.bycombine [ck]]));
			}
		}
		var result = [];
		for (var [c1buildable, c2buildable, item] of sorted (oneoff, __kwargtrans__ ({reverse: true, key: (function __lambda__ (i) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'i': var i = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return i [2].score;
		})}))) {
			var c = item.combine;
			if (c2buildable) {
				var c = tuple ([c [1], c [0]]);
				var __left0__ = tuple ([c2buildable, c1buildable]);
				var c1buildable = __left0__ [0];
				var c2buildable = __left0__ [1];
			}
			if (oof !== null && c [1] != oof) {
				continue;
			}
			result.append (self.mkcomponentstr (c [0], c [1], __kwargtrans__ ({minitclass: (!(c1buildable) ? 'showunbuildable' : ''), minibclass: (!(c2buildable) ? 'showunbuildable' : ''), imgclass: (item.score < SCORE_THRESHOLD ? 'showunbuildablefonly lowscore' : 'showunbuildablefonly'), imgextra: 'onclick=\'ti.ti.setoneofffilter("{0}")\''.format (c [1])})));
		}
		sih ('oneoff', ''.join (result));
	}, 'renderoneoff');},
	get mkcomponentstr () {return __get__ (this, function (self, c1, c2, minitclass, minibclass, imgclass, imgextra) {
		if (typeof minitclass == 'undefined' || (minitclass != null && minitclass.hasOwnProperty ("__kwargtrans__"))) {;
			var minitclass = '';
		};
		if (typeof minibclass == 'undefined' || (minibclass != null && minibclass.hasOwnProperty ("__kwargtrans__"))) {;
			var minibclass = '';
		};
		if (typeof imgclass == 'undefined' || (imgclass != null && imgclass.hasOwnProperty ("__kwargtrans__"))) {;
			var imgclass = '';
		};
		if (typeof imgextra == 'undefined' || (imgextra != null && imgextra.hasOwnProperty ("__kwargtrans__"))) {;
			var imgextra = '';
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'c1': var c1 = __allkwargs0__ [__attrib0__]; break;
						case 'c2': var c2 = __allkwargs0__ [__attrib0__]; break;
						case 'minitclass': var minitclass = __allkwargs0__ [__attrib0__]; break;
						case 'minibclass': var minibclass = __allkwargs0__ [__attrib0__]; break;
						case 'imgclass': var imgclass = __allkwargs0__ [__attrib0__]; break;
						case 'imgextra': var imgextra = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var c1name = COMPONENT [int (c1)];
		var c2name = COMPONENT [int (c2)];
		var ck = ''.join ((c1 > c2 ? tuple ([c2, c1]) : tuple ([c1, c2])));
		var item = py_items.bycombine [ck];
		var itemtitle = '{0}: {1}'.format (item.py_name, item.text);
		return self.template.py_get ('item-with-components').format (__kwargtrans__ ({cid1: c1, cid2: c2, combine: ck, c1name: c1name, c2name: c2name, itemtitle: itemtitle, minibclass: minibclass, minitclass: minitclass, imgclass: imgclass, imgextra: imgextra}));
	}, 'mkcomponentstr');},
	get rendershop () {return __get__ (this, function (self) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var result = [];
		var tmpl = self.template.py_get ('shop');
		for (var cid = 0; cid < 8; cid++) {
			result.append (tmpl.format (__kwargtrans__ ({cid: cid, text: COMPONENT [cid]})));
		}
		result.append ('<br>');
		sih ('baseitems', ''.join (result));
	}, 'rendershop');},
	get fixtooltips () {return __get__ (this, function (self) {
		var width = window.innerWidth;
		var tofix = [];
		for (var ttdiv of document.querySelectorAll ('div.fixtip[data-balloon-pos="up-left"]')) {
			var divrect = ttdiv.parentElement.getBoundingClientRect ();
			if (divrect.x + divrect.width * 3 >= width) {
				tofix.append (ttdiv);
			}
		}
		var go = function () {
			for (var ttdiv of tofix) {
				ttdiv.setAttribute ('data-balloon-pos', 'up-right');
			}
		};
		requestAnimationFrame (go);
	}, 'fixtooltips');}
});
export var py_items = Items ();
export var ti = TI ();
ti.rendershop ();
ti.mkwantedoptions ();

//# sourceMappingURL=ti.map