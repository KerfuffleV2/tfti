# Note that there's a lot of dumb/unidiomatic code here to work around Transcrypt weirdness.

# __pragma__ ('skip')
document = console = ITEMS = __pragma__ = localStorage = requestAnimationFrame = object()
# __pragma__('noskip')

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
    self.components = {}
    compstr = localStorage.getItem('items')
    if compstr is not None:
      for cid in compstr:
        self.modify(cid, 1)

  def get(self, cid):
    return self.components.get(cid, 0)

  def clear(self):
    self.components = {}

  def modify(self, cid, amt):
    cid = int(cid)
    componentcount = self.get(cid)
    self.components[cid] = max(0, componentcount + amt)

  def values(self):
    return self.components.values()

  def __str__(self):
    result = []
    for cid in range(8):
      count = self.get(cid)
      if count > 0:
        for _ in range(count):
          result.append(str(cid))
    return ''.join(result)


class TI(object):
  def __init__(self):
    self.uipref = UIPrefs()
    self.components = Components()
    wantedstr = localStorage.getItem('wanted')
    if wantedstr is not None:
      self.wanted = set(wantedstr.split(','))
    else:
      self.wanted = set()
    self.ready = False

  def setready(self):
    self.ready = True
    self.render()

  def clearitems(self):
    if not self.ready:
      return
    self.components.clear()
    self.render()

  def inccomp(self, cid):
    if not self.ready or sum(self.components.values()) > 7:
      return
    self.components.modify(cid, 1)
    self.render()

  def deccomp(self, cid):
    if not self.ready:
      return
    self.components.modify(cid, -1)
    self.render()

  def decitem(self, fi):
    if not self.ready:
      return
    self.components.modify(fi[0], -1)
    self.components.modify(fi[1], -1)
    self.render()


  def render(self):
    def go():
      self.rendercomponents()
      self.rendercombinations()
      self.renderwanted()
      requestAnimationFrame(self.fixtooltips)
    requestAnimationFrame(go)


  def rendercomponents(self):
    result = []
    componentstr = str(self.components)
    if len(componentstr) > 0:
      localStorage.setItem('items', componentstr)
    else:
      localStorage.removeItem('items')
    for cid in list(componentstr):
      result.append("""
      <div>
        <div class="baseitem fixtip" data-balloon-blunt data-balloon-length="medium" data-balloon-pos="up-left" aria-label="{1}">
          <img src="img/{0}.png" class="del" onclick="ti.ti.deccomp({2})">
        </div>
      </div>
      """.format(cid, COMPONENT[int(cid)], cid))
    sih('items', ''.join(result))

  # __pragma__('kwargs')
  def rendercombinations(self):
    result = []
    componentstr = str(self.components)
    if len(componentstr) < 2:
      sih('combinations', '')
      sih('buildable', '')
      return
    if len(componentstr) & 1:
      componentstr = componentstr + ' '
    up = mkcombinations(tuple(componentstr))
    uniqueitems = {}
    for (pi, spare) in sorted(up, reverse = True, key = lambda ps: sum(i.score for i in ps[0])):
      pi = sorted(pi, reverse = True, key = lambda i: i.score)
      result.append('<div class="combinationscontainer">')
      for thisitem in pi:
        uniqueitems[thisitem.combine] = thisitem
        result.append(self.rendercomponentstr(thisitem.combine[0], thisitem.combine[1], 'c',
          imgclass = 'lowscore' if thisitem.score < 3 else ''))
      if spare is not None:
        result.append('<div class="spare fixtip" data-balloon-blunt data-balloon-length="medium" data-balloon-pos="up-left" aria-label="{1}"><img src="img/{0}.png" class="spare" title="{1}"></div>'.format(spare, COMPONENT[int(spare)]))
      result.append('</div>')
    self.renderbuildable(uniqueitems.values())
    sih('combinations', ''.join(result))

  def renderbuildable(self, uniqueitems):
    result = []
    for item in sorted(uniqueitems, reverse = True, key = lambda i: i.score):
      c = item.combine
      result.append(self.rendercomponentstr(c[0], c[1], 'b', imgextra="onclick=\"ti.ti.decitem('{0}')\"".format(c),
        imgclass = 'lowscore' if item.score < 3 else ''))
    sih('buildable', ''.join(result))
  # __pragma__('nokwargs')

  def mkwantedoptions(self):
    sitems = sorted(items.bycombine.values(), key = lambda i: i.name)
    result = ['<option></option>']
    for item in sitems:
      result.append('<option value="{0}">{1}</option>'.format(item.combine, item.name))
    sih('wantedselect', ''.join(result))

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

  # __pragma__('kwargs')
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
      result.append(self.rendercomponentstr(c[0], c[1], 'w',
        minitclass = 'showunbuildable' if not c1buildable else '',
        minibclass = 'showunbuildable' if not c2buildable else '',
        imgclass = 'showunbuildable' if not buildable else '',
        imgextra = "onclick='ti.ti.delwanted(\"{0}\")'".format(c)
      ))
    sih('wanted', ''.join(result))

  def rendercomponentstr(self, c1, c2, typ, minitclass = '', minibclass = '', imgclass = '', imgextra = ''):
    c1name = COMPONENT[int(c1)]
    c2name = COMPONENT[int(c2)]
    item = items.bycombine[''.join((c1,c2))]
    itemtitle = '{0}: {1}'.format(item.name, item.text)
    return '''
      <div class="component">
        <div class="minit fixtip" data-balloon-blunt data-balloon-length="medium" data-balloon-pos="up-left" aria-label="{c1name}"><img src="img/{c1}.png" class="minit {minitclass}"></div>
        <div class="minib fixtip" data-balloon-blunt data-balloon-length="medium" data-balloon-pos="up-left" aria-label="{c2name}"><img src="img/{c2}.png" class="minib {minibclass}"></div>
        <div class="combitem fixtip" data-balloon-blunt data-balloon-length="medium" data-balloon-pos="up-left" aria-label="{itemtitle}">
          <img src="img/{c1}{c2}.png" class="component {imgclass}" {imgextra}>
        </div>
      </div>'''.format(c1 = c1, c2 = c2,  c1name = c1name, c2name = c2name,
                       itemtitle = itemtitle, typ = typ,
                       minibclass = minibclass, minitclass = minitclass,
                       imgclass = imgclass, imgextra = imgextra)
  # __pragma__('nokwargs')

  def fixtooltips(self):
    width = window.innerWidth
    tofix = []
    for ttdiv in document.querySelectorAll('div.fixtip[data-balloon-pos="up-left"]'):
      divrect = ttdiv.parentElement.getBoundingClientRect();
      if divrect.x + (divrect.width * 3) >= width:
        tofix.append(ttdiv)
    def runfix():
      for ttdiv in tofix:
        ttdiv.setAttribute('data-balloon-pos', 'up-right')
    requestAnimationFrame(runfix)

  def mkbuttons(self):
    result = []
    for cid in range(8):
      result.append("""
        <div class="baseitem fixtip" data-balloon-blunt data-balloon-length="medium" data-balloon-pos="down-left" aria-label="{1}">
          <img src="img/{0}.png" class="add" onclick="ti.ti.inccomp('{2}')">
        </div>
        """.format(cid, COMPONENT[cid], cid))
    result.append('<br>')
    sih('baseitems', ''.join(result))

items = Items()
ti = TI()
ti.mkbuttons()
ti.mkwantedoptions()
