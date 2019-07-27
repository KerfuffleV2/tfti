# Note that there's a lot of dumb/unidiomatic code here to work around Transcrypt weirdness.

# __pragma__ ('skip')
class _AnyObj(object):
  def __init__(self, *_, **_):
    raise NotImplementedError()
  def __iter__(self):
    raise NotImplementedError()
  def next(self):
    raise NotImplementedError()

document = console = ITEMS = requestAnimationFrame = __pragma__ = localStorage = _AnyObj()
# __pragma__('noskip')

SCORE_THRESHOLD = 3

COMPONENT = (
  'B.F. Sword: +20 attack damage',
  'Recurve Bow: +20% attack speed',
  'Needlessly Large Rod: +20% spell damage',
  'Tear of the Goddess: +20 starting mana',
  'Chain Vest: +20 armor',
  'Negatron Cloak: +20 magic resist',
  "Giant's belt: +200 health",
  'Spatula',
  )

itemsj = ITEMS

class Item(object):
  def __init__(self, itemj):
    self.combine = itemj['comp']
    self.text = itemj['desc']
    self.name = itemj['name']
    self.score = itemj['score']

  def __str__(self):
    return '<Item combine={0} score={1} name=[{2}] text=[{3}]'.format(self.combine, self.score, self.name, self.text)

class Items(object):
  def __init__(self):
    self.bycombine = {}
    self.byname = {}
    for itemj in itemsj:
      item = Item(itemj)
      self.bycombine[item.combine] = item
      self.byname[item.name] = item


# Modified from https://stackoverflow.com/a/21762051
def mkcombinations(l):
  result = []
  seen = set()
  def rec(l, choice):
    if len(l) == 0:
      tempresult = []
      spare = None
      for i in choice:
        i = sorted(i)
        if i[0] == ' ':
          spare = i[1]
          continue
        tempresult.append(''.join(i))
      tempresult.sort()
      sk = ''.join(tempresult)
      if sk in seen:
        return
      seen.add(sk)
      retval = list(items.bycombine[k] for k in tempresult)
      result.append((retval, spare))
    else:
      for j in range(1, len(l)):
        choice1 = choice[:]
        choice1.append((l[0], l[j]))
        l1 = []
        for x in range(1, j):
          l1.append(l[x])
        for x in range(j + 1, len(l)):
          l1.append(l[x])
        rec(l1, choice1)
  rec(l, [])
  return result


def sih(k, v):
  document.getElementById(k).innerHTML = v


class UIPrefs(object):
  themes = ('Dark', 'Light')
  iconsizes = (('Medium', '0.75'), ('Large', '1.0'), ('Small', '0.5'))

  def __init__(self):
    self.iconsize = 0
    try:
      iconsizestr = localStorage.getItem('iconsize')
      if iconsizestr is not None:
        iconsznum = max(0, int(iconsizestr)) % len(self.iconsizes)
        self.seticonsize(iconsznum)
    except:
      pass
    self.theme = 0
    try:
      themestr = localStorage.getItem('theme')
      if themestr is not None:
        themenum = max(0, int(themestr)) % len(self.themes)
        self.settheme(themenum)
    except:
      pass

  def toggleiconsize(self):
    iconsznum = (self.iconsize + 1) % len(self.iconsizes)
    self.seticonsize(iconsznum)

  def seticonsize(self, iconsznum):
    self.iconsize = iconsznum
    sizename,scale = self.iconsizes[iconsznum]
    document.documentElement.style.setProperty('--icon-scale', scale)
    localStorage.setItem('iconsize', str(iconsznum))
    sih('iconsize', sizename)

  def toggletheme(self):
    themenum = (self.theme + 1) % len(self.themes)
    self.settheme(themenum)

  def settheme(self, themenum):
    themename = self.themes[themenum]
    self.theme = themenum
    document.documentElement.setAttribute('data-theme', themename.lower())
    sih('theme', themename)
    localStorage.setItem('theme', str(themenum))


class Components(object):
  def __init__(self):
    self.clear()
    compstr = localStorage.getItem('items')
    if compstr is not None:
      for cid in compstr:
        self.modify(cid, 1)
    self.sync()

  def get(self, cid):
    return self.components.get(cid, 0)

  def clear(self):
    self.dirty = False
    self.components = {}
    self.uniqueitems = {}
    self.combinations = []

  def sync(self):
    if not self.dirty:
      return
    self.dirty = False
    componentstr = self.tocomponentstr()
    if len(componentstr) < 2:
      self.uniqueitems = {}
      self.combinations = []
      return
    if len(componentstr) & 1:
      componentstr = componentstr + ' '
    up = mkcombinations(tuple(componentstr))
    uniqueitems = {}
    result = []
    for (pi, spare) in sorted(up, reverse = True, key = lambda ps: sum(i.score for i in ps[0])):
      pi = list(sorted(pi, reverse = True, key = lambda i: (i.score, i.name)))
      result.append((pi, spare))
      for thisitem in pi:
        uniqueitems[thisitem.combine] = thisitem
    self.uniqueitems = uniqueitems
    self.combinations = result

  def modify(self, cid, amt):
    cid = int(cid)
    componentcount = self.get(cid)
    newcount = max(0, componentcount + amt)
    self.components[cid] = newcount
    if newcount != componentcount:
      self.dirty = True

  def values(self):
    return self.components.values()

  def tocomponentstr(self):
    result = []
    for cid in range(8):
      count = self.get(cid)
      if count > 0:
        for _ in range(count):
          result.append(str(cid))
    return ''.join(result)



class Templates(object):
  def __init__(self):
    self.templates = {}

  def get(self, k):
    k = 'template-' + k
    tmpl = self.templates.get(k, None)
    if tmpl is None:
      newtmpl = document.getElementById(k)
      if hasattr(newtmpl, 'innerHTML'):
        tmpl = (newtmpl.innerHTML,)
      else:
        tmpl = (None,)
    if tmpl[0] is None:
      return '!!TEMPLATE MISSING!!'
    return tmpl[0]


class TI(object):
  def __init__(self):
    self.uipref = UIPrefs()
    self.components = Components()
    self.template = Templates()
    wantedstr = localStorage.getItem('wanted')
    if wantedstr is not None:
      self.wanted = set(wantedstr.split(','))
    else:
      self.wanted = set()
    self.combinationfilter = None
    self.ready = False

  def setready(self):
    self.ready = True
    self.render()

  def clearitems(self):
    if not self.ready:
      return
    self.components.clear()
    self.components.sync()
    self.render()

  def inccomp(self, cid):
    if not self.ready or sum(self.components.values()) > 7:
      return
    self.components.modify(cid, 1)
    self.components.sync()
    self.render()

  def deccomp(self, cid):
    if not self.ready:
      return
    self.components.modify(cid, -1)
    self.components.sync()
    self.render()

  def decitem(self, fi):
    if not self.ready:
      return
    self.components.modify(fi[0], -1)
    self.components.modify(fi[1], -1)
    self.components.sync()
    self.render()

  def render(self):
    def go():
      self.rendercomponents()
      self.renderwanted()
      self.renderbuildable()
      self.renderoneoff()
      self.rendercombinations()
      requestAnimationFrame(self.fixtooltips)
    requestAnimationFrame(go)

  def setwanted(self, thisarg):
    if len(self.wanted) >= 16:
      return
    self.wanted.add(thisarg.value)
    thisarg.value = ''
    self.renderwanted()
    self.fixtooltips()

  def delwanted(self, c):
    self.wanted.remove(c)
    self.renderwanted()
    self.fixtooltips()

  def setcombfilter(self, filt):
    self.combinationfilter = filt
    tmpl = self.template.get('combfilter')
    sih('combinationsfilter', tmpl.format(combine = filt))
    self.rendercombinations()
    self.fixtooltips()

  def clearcombfilter(self):
    self.combinationfilter = None
    sih('combinationsfilter', '')
    self.rendercombinations()
    self.fixtooltips()

  # __pragma__('kwargs')
  def mkwantedoptions(self):
    tmpl = self.template.get('wanted-option')
    sitems = sorted(items.bycombine.values(), key = lambda i: i.name)
    result = ['<option></option>']
    for item in sitems:
      result.append(tmpl.format(combine = item.combine, itemname = item.name))
    sih('wantedselect', ''.join(result))

  def rendercomponents(self):
    result = []
    componentstr = self.components.tocomponentstr()
    if len(componentstr) > 0:
      localStorage.setItem('items', componentstr)
    else:
      localStorage.removeItem('items')
    tmpl = self.template.get('owned-components')
    for cid in list(componentstr):
      result.append(tmpl.format(cid = cid, text = COMPONENT[int(cid)]))
    sih('items', ''.join(result))

  def rendercombinations(self):
    result = []
    if len(self.components.tocomponentstr()) < 2:
      sih('combinations', '')
      sih('buildable', '')
      self.renderoneoff({})
      return
    tmpl = self.template.get('spare')
    for (pi, spare) in self.components.combinations:
      if self.combinationfilter is not None and not any(i.combine == self.combinationfilter for i in pi):
          continue
      result.append('<div class="combinationscontainer">')
      for thisitem in pi:
        result.append(self.mkcomponentstr(thisitem.combine[0], thisitem.combine[1],
          imgclass = 'lowscore' if thisitem.score < SCORE_THRESHOLD else '',
          imgextra = 'onclick="ti.ti.setcombfilter(\'{0}\')"'.format(thisitem.combine)))
      if spare is not None:
        result.append(tmpl.format(sparecid = spare, text = COMPONENT[int(spare)]))
      result.append('</div>')
    sih('combinations', ''.join(result))

  def renderbuildable(self):
    uniqueitems = self.components.uniqueitems
    result = []
    for item in sorted(uniqueitems.values(), reverse = True, key = lambda i: i.score):
      c = item.combine
      result.append(self.mkcomponentstr(c[0], c[1], imgextra="onclick=\"ti.ti.decitem('{0}')\"".format(c),
        imgclass = 'lowscore' if item.score < SCORE_THRESHOLD else ''))
    sih('buildable', ''.join(result))

  def renderwanted(self):
    if len(self.wanted) > 0:
      localStorage.setItem('wanted', ','.join(self.wanted))
    else:
      localStorage.removeItem('wanted')
    result = []
    for c in self.wanted:
      if c[0] == c[1]:
        havec = self.components.get(int(c[0]))
        c1buildable = havec > 0
        c2buildable = buildable = havec > 1
      else:
        c1buildable = self.components.get(int(c[0])) > 0
        c2buildable = self.components.get(int(c[1])) > 0
        buildable = c1buildable and c2buildable
      result.append(self.mkcomponentstr(c[0], c[1],
        minitclass = 'showunbuildable' if not c1buildable else '',
        minibclass = 'showunbuildable' if not c2buildable else '',
        imgclass = 'showunbuildable' if not buildable else '',
        imgextra = "onclick='ti.ti.delwanted(\"{0}\")'".format(c)
      ))
    sih('wanted', ''.join(result))

  def renderoneoff(self):
    uniqueitems = self.components.uniqueitems
    oneoff = []
    for cid1c in range(8):
      havec1 = self.components.get(cid1c)
      if havec1 != 1:
        continue
      for cid2c in range(8):
        havec2 = self.components.get(cid2c)
        cid1 = cid1c
        cid2 = cid2c
        currhavec1 = havec1
        if cid1 > cid2:
          cid1, cid2 = (cid2, cid1)
          currhavec1, havec2 = (havec2, currhavec1)
        ck = ''.join((str(cid1), str(cid2)))
        if ck in uniqueitems:
          continue
        if cid1 == cid2:
          c1buildable = True
          c2buildable = False
        else:
          c1buildable = currhavec1 > 0
          c2buildable = havec2 > 0
        oneoff.append((c1buildable, c2buildable, items.bycombine[ck]))
    result = []
    for c1buildable, c2buildable, item in sorted(oneoff, reverse = True, key = lambda i: i[2].score):
      c = item.combine
      if c2buildable:
        c = (c[1], c[0])
        c1buildable, c2buildable = (c2buildable, c1buildable)
      result.append(self.mkcomponentstr(c[0], c[1],
        minitclass = 'showunbuildable' if not c1buildable else '',
        minibclass = 'showunbuildable' if not c2buildable else '',
        imgclass = 'showunbuildablefonly lowscore' if item.score < SCORE_THRESHOLD else 'showunbuildablefonly'
      ))
    sih('oneoff', ''.join(result))


  def mkcomponentstr(self, c1, c2, minitclass = '', minibclass = '', imgclass = '', imgextra = ''):
    c1name = COMPONENT[int(c1)]
    c2name = COMPONENT[int(c2)]
    ck = ''.join((c2, c1) if c1 > c2 else (c1, c2))
    item = items.bycombine[ck]
    itemtitle = '{0}: {1}'.format(item.name, item.text)
    return self.template.get('item-with-components').format(
      cid1 = c1, cid2 = c2, combine = ck, c1name = c1name, c2name = c2name,
      itemtitle = itemtitle,
      minibclass = minibclass, minitclass = minitclass,
      imgclass = imgclass, imgextra = imgextra)

  def rendershop(self):
    result = []
    tmpl = self.template.get('shop')
    for cid in range(8):
      result.append(tmpl.format(cid = cid, text = COMPONENT[cid]))
    result.append('<br>')
    sih('baseitems', ''.join(result))
  # __pragma__('nokwargs')


  def fixtooltips(self):
    width = window.innerWidth
    tofix = []
    for ttdiv in document.querySelectorAll('div.fixtip[data-balloon-pos="up-left"]'):
      divrect = ttdiv.parentElement.getBoundingClientRect();
      if divrect.x + (divrect.width * 3) >= width:
        tofix.append(ttdiv)
    def go():
      for ttdiv in tofix:
        ttdiv.setAttribute('data-balloon-pos', 'up-right')
    requestAnimationFrame(go)

items = Items()
ti = TI()
ti.rendershop()
ti.mkwantedoptions()
