// Transcrypt'ed from Python, 2019-07-13 01:51:20
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var baseitem = tuple (['sword', 'bow', 'rod', 'tear', 'armor', 'cloak', 'belt', 'spatula']);
export var itemsj = ITEMS;
export var Item =  __class__ ('Item', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, itemj) {
		self.combine = itemj ['comp'];
		self.text = itemj ['desc'];
		self.py_name = itemj ['name'];
		self.score = itemj ['score'];
	}, '__init__');}
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
export var sih = function (k, v) {
	document.getElementById (k).innerHTML = v;
};
export var TI =  __class__ ('TI', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.py_items = dict ({});
		self.wanted = set ();
		self.ready = false;
	}, '__init__');},
	get setready () {return __get__ (this, function (self) {
		self.ready = true;
	}, 'setready');},
	get clearitems () {return __get__ (this, function (self) {
		if (!(self.ready)) {
			return ;
		}
		self.py_items = dict ({});
		self.render ();
	}, 'clearitems');},
	get moditem () {return __get__ (this, function (self, i, l) {
		var i = int (i);
		var itemcount = self.py_items.py_get (i, 0);
		self.py_items [i] = l (itemcount);
	}, 'moditem');},
	get incitem () {return __get__ (this, function (self, i) {
		if (!(self.ready) || sum (self.py_items.py_values ()) > 7) {
			return ;
		}
		self.moditem (i, (function __lambda__ (ic) {
			return ic + 1;
		}));
		self.render ();
	}, 'incitem');},
	get decitem () {return __get__ (this, function (self, i) {
		if (!(self.ready)) {
			return ;
		}
		self.moditem (i, (function __lambda__ (ic) {
			return max (0, ic - 1);
		}));
		self.render ();
	}, 'decitem');},
	get decfullitem () {return __get__ (this, function (self, c) {
		if (!(self.ready)) {
			return ;
		}
		var decf = (function __lambda__ (ic) {
			return max (0, ic - 1);
		});
		self.moditem (c [0], decf);
		self.moditem (c [1], decf);
		self.tipout ('b');
		self.render ();
	}, 'decfullitem');},
	get itemstostr () {return __get__ (this, function (self) {
		var result = [];
		for (var k = 0; k < 8; k++) {
			var count = self.py_items.py_get (k, 0);
			if (count > 0) {
				for (var _ = 0; _ < count; _++) {
					result.append (str (k));
				}
			}
		}
		return ''.join (result);
	}, 'itemstostr');},
	get render () {return __get__ (this, function (self) {
		self.renderitems ();
		self.rendercombinations ();
		self.renderwanted ();
	}, 'render');},
	get renderitems () {return __get__ (this, function (self) {
		var result = [];
		for (var iidx of list (self.itemstostr ())) {
			result.append ('<img src="img/{0}.png" class="del" title="{1}" onclick="ti.ti.decitem({2})">'.format (iidx, baseitem [int (iidx)], iidx));
		}
		sih ('items', ''.join (result));
	}, 'renderitems');},
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
		var newup = [];
		for (var p of up) {
			var newp = [];
			var spare = null;
			for (var i of p) {
				if (i [0] == ' ') {
					var spare = i [1];
					continue;
				}
				newp.append (py_items.bycombine [''.join (i)]);
			}
			newup.append (tuple ([newp, spare]));
		}
		for (var [pi, spare] of sorted (newup, __kwargtrans__ ({reverse: true, key: (function __lambda__ (ps) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'ps': var ps = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return sum ((function () {
				var __accu0__ = [];
				for (var i of ps [0]) {
					__accu0__.append (i.score);
				}
				return py_iter (__accu0__);
			}) ());
		})}))) {
			var pi = sorted (pi, __kwargtrans__ ({reverse: true, key: (function __lambda__ (i) {
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
			})}));
			var sk = ''.join (sorted (list ((function () {
				var __accu0__ = [];
				for (var i of pi) {
					__accu0__.append (i.combine);
				}
				return py_iter (__accu0__);
			}) ())));
			if (__in__ (sk, seen)) {
				continue;
			}
			result.append ('<div class="combinationscontainer">');
			seen.add (sk);
			for (var thisitem of pi) {
				uniqueitems [thisitem.combine] = thisitem;
				result.append (self.rendercomponentstr (thisitem.combine [0], thisitem.combine [1], 'c', __kwargtrans__ ({imgclass: (thisitem.score < 3 ? 'lowscore' : '')})));
			}
			if (spare !== null) {
				result.append ('<img src="img/{0}.png" class="spare" title="{1}">'.format (spare, baseitem [int (spare)]));
			}
			result.append ('</div>');
		}
		self.renderbuildable (uniqueitems.py_values ());
		sih ('combinations', ''.join (result));
	}, 'rendercombinations');},
	get renderbuildable () {return __get__ (this, function (self, uniqueitems) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'uniqueitems': var uniqueitems = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		var result = [];
		for (var item of sorted (uniqueitems, __kwargtrans__ ({reverse: true, key: (function __lambda__ (i) {
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
			result.append (self.rendercomponentstr (c [0], c [1], 'b', __kwargtrans__ ({imgextra: 'onclick="ti.ti.decfullitem(\'{0}\')"'.format (c), imgclass: (item.score < 3 ? 'lowscore' : '')})));
		}
		sih ('buildable', ''.join (result));
	}, 'renderbuildable');},
	get mkwantedoptions () {return __get__ (this, function (self) {
		var sitems = sorted (py_items.bycombine.py_values (), __kwargtrans__ ({key: (function __lambda__ (i) {
			return i.py_name;
		})}));
		var result = ['<option></option>'];
		for (var item of sitems) {
			result.append ('<option value="{0}">{1}</option>'.format (item.combine, item.py_name));
		}
		sih ('wantedselect', ''.join (result));
	}, 'mkwantedoptions');},
	get tipout () {return __get__ (this, function (self, typ) {
		if (typ == 'b') {
			var did = 'buildabletip';
		}
		else if (typ == 'c') {
			var did = 'combinestip';
		}
		else {
			return ;
		}
		sih (did, '');
	}, 'tipout');},
	get tip () {return __get__ (this, function (self, typ, c) {
		if (typ == 'b') {
			var did = 'buildabletip';
		}
		else if (typ == 'c') {
			var did = 'combinestip';
		}
		else {
			return ;
		}
		var item = py_items.bycombine [c];
		var itemtitle = '{0}: {1}'.format (item.py_name, item.text);
		sih (did, itemtitle);
	}, 'tip');},
	get setwanted () {return __get__ (this, function (self, thisarg) {
		if (len (self.wanted) >= 16) {
			return ;
		}
		self.wanted.add (thisarg.value);
		thisarg.value = '';
		self.renderwanted ();
	}, 'setwanted');},
	get delwanted () {return __get__ (this, function (self, c) {
		self.wanted.remove (c);
		self.renderwanted ();
	}, 'delwanted');},
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
		var result = [];
		for (var c of self.wanted) {
			if (c [0] == c [1]) {
				var havec = self.py_items.py_get (int (c [0]), 0);
				var c1buildable = havec > 0;
				var __left0__ = havec > 1;
				var c2buildable = __left0__;
				var buildable = __left0__;
			}
			else {
				var c1buildable = self.py_items.py_get (int (c [0]), 0) > 0;
				var c2buildable = self.py_items.py_get (int (c [1]), 0) > 0;
				var buildable = c1buildable && c2buildable;
			}
			result.append (self.rendercomponentstr (c [0], c [1], 'w', __kwargtrans__ ({minitclass: (!(c1buildable) ? 'showdel' : ''), minibclass: (!(c2buildable) ? 'showdel' : ''), imgclass: (!(buildable) ? 'showdel' : ''), imgextra: 'onclick=\'ti.ti.delwanted("{0}")\''.format (c)})));
		}
		sih ('wanted', ''.join (result));
	}, 'renderwanted');},
	get rendercomponentstr () {return __get__ (this, function (self, c1, c2, typ, minitclass, minibclass, imgclass, imgextra) {
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
						case 'typ': var typ = __allkwargs0__ [__attrib0__]; break;
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
		var c1name = baseitem [int (c1)];
		var c2name = baseitem [int (c2)];
		var item = py_items.bycombine [''.join (tuple ([c1, c2]))];
		var itemtitle = '{0}: {1}'.format (item.py_name, item.text);
		return '\n      <div class="component">\n        <div class="minit"><img src="img/{c1}.png" title="{c1name}" class="minit {minitclass}"></div>\n        <div class="minib"><img src="img/{c2}.png" title="{c2name}" class="minib {minibclass}"></div>\n        <div class="combitem">\n          <img src="img/{c1}{c2}.png" title="{itemtitle}" class="component {imgclass}"\n               onmouseover=\'ti.ti.tip("{typ}", "{c1}{c2}")\'\n               onmouseout=\'ti.ti.tipout("{typ}")\' {imgextra}>\n        </div>\n      </div>'.format (__kwargtrans__ ({c1: c1, c2: c2, c1name: c1name, c2name: c2name, itemtitle: itemtitle, typ: typ, minibclass: minibclass, minitclass: minitclass, imgclass: imgclass, imgextra: imgextra}));
	}, 'rendercomponentstr');},
	get mkbuttons () {return __get__ (this, function (self) {
		var result = [];
		for (var iidx = 0; iidx < 8; iidx++) {
			result.append ('<img src="img/{0}.png" class="add" title="{1}" onclick="ti.ti.incitem(\'{2}\')">'.format (iidx, baseitem [iidx], iidx));
		}
		result.append ('<br>');
		sih ('baseitems', ''.join (result));
	}, 'mkbuttons');}
});
export var py_items = Items ();
export var ti = TI ();
ti.mkbuttons ();
ti.mkwantedoptions ();

//# sourceMappingURL=ti.map