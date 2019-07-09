# Note that there's a lot of dumb/unidiomatic code here to work around Transcrypt weirdness.

# __pragma__ ('skip')
document = console = ITEMS = __pragma__ = object()
# __pragma__('noskip')

baseitem = ('sword', 'bow', 'rod', 'tear', 'armor', 'cloak', 'belt', 'spatula')

itemsj = ITEMS

class Item(object):
  def __init__(self, itemj):
    self.combine = itemj['comp']
    self.text = itemj['desc']
    self.name = itemj['name']
    self.score = itemj['score']

class Items(object):
  def __init__(self, items):
    self.bycombine = {}
    self.byname = {}
    for itemj in itemsj:
      item = Item(itemj)
      self.bycombine[item.combine] = item
      self.byname[item.name] = item


# Modified from https://stackoverflow.com/a/21762051
def uniquepairs(l):
  result = []
  def rec(l, choice, depth):
    if depth > 10:
      print('MAXDEPTH', depth)
      return
    if len(l) == 0:
      tempresult = []
      for i in choice:
        tempresult.append(tuple(sorted(i)))
      retval = tuple(sorted(tempresult))
      if retval in result:
        return
      result.append(retval)
    else:
      for j in range(1, len(l)):
        choice1 = choice[:]
        choice1.append((l[0],l[j]))
        l1 = []
        for x in range(1, j):
          l1.append(l[x])
        for x in range(j + 1, len(l)):
          l1.append(l[x])
        rec(l1, choice1, depth + 1)
  rec(l, [], 0)
  return result


def sih(k, v):
  document.getElementById(k).innerHTML = v


class TI(object):
  def __init__(self):
    self.items = {}
    self.wanted = set()
    self.ready = False

  def setready(self):
    self.ready = True

  def incitem(self, i):
    if not self.ready or sum(self.items.values()) > 7:
      return
    i = int(i)
    itemcount = self.items.get(i, 0)
    self.items[i] = itemcount + 1
    self.render()

  def decitem(self, i):
    if not self.ready:
      return
    i = int(i)
    itemcount = max(self.items.get(i, 0) - 1, 0)
    self.items[i] = itemcount
    self.render()

  def itemstostr(self):
    result = []
    for k in range(8):
      count = self.items.get(k, 0)
      if count > 0:
        for _ in range(count):
          result.append(str(k))
    return ''.join(result)

  def render(self):
    self.renderitems()
    self.rendercombinations()
    self.renderwanted()

  def renderitems(self):
    result = []
    for iidx in list(self.itemstostr()):
      result.append('<img src="img/{0}.png" class="del" title="{1}" onclick="ti.ti.decitem({2})">'.format(iidx, baseitem[int(iidx)], iidx))
    sih('items', ''.join(result))

  def rendercombinations(self):
    result = []
    itemstr = self.itemstostr()
    if len(itemstr) < 2:
      sih('combinations', '')
      sih('buildable', '')
      return
    if len(itemstr) & 1:
      itemstr = itemstr + ' '
    up = uniquepairs(tuple(itemstr))
    uniqueitems = {}
    seen = set()
    for p in sorted(up):
      sk = ''.join(''.join(i) for i in p)
      if sk in seen:
        continue
      result.append('<div class="combinationscontainer">')
      seen.add(sk)
      spare = None
      for i in p:
        if i[0] == ' ':
          spare = i[1]
          continue
        uniqueitems[''.join(i)] = 1
        result.append(self.rendercomponentstr(i[0], i[1], 'c'))
      if spare is not None:
        result.append('<img src="img/{0}.png" class="spare" title="{1}">'.format(spare, baseitem[int(spare)]))
      result.append('</div>')
    self.renderbuildable(uniqueitems.keys())
    sih('combinations', ''.join(result))

  def renderbuildable(self, uniqueitems):
    result = []
    for c in uniqueitems:
      result.append(self.rendercomponentstr(c[0], c[1], 'b'))
    sih('buildable', ''.join(result))

  def mkwantedoptions(self):
    sitems = sorted(items.bycombine.values(), key = lambda i: i.name)
    result = ['<option></option>']
    for item in sitems:
      result.append('<option value="{0}">{1}</option>'.format(item.combine, item.name))
    sih('wantedselect', ''.join(result))

  def tipout(self, typ):
    if typ == 'b':
      did = 'buildabletip'
    elif typ == 't':
      did = 'combinestip'
    else:
      return
    sih(did, '')

  def tip(self, typ, c):
    if typ == 'b':
      did = 'buildabletip'
    elif typ == 't':
      did = 'combinestip'
    else:
      return
    item = items.bycombine[c]
    itemtitle = '{0}: {1}'.format(item.name, item.text)
    sih(did, itemtitle)

  def setwanted(self, thisarg):
    if len(self.wanted) >= 16:
      return
    self.wanted.add(thisarg.value)
    thisarg.value = ''
    self.renderwanted()

  def delwanted(self, c):
    self.wanted.remove(c)
    self.renderwanted()

  # __pragma__('kwargs')
  def renderwanted(self):
    result = []
    for c in self.wanted:
      if c[0] == c[1]:
        havec = self.items.get(int(c[0]), 0)
        c1buildable = havec > 0
        c2buildable = buildable = havec > 1
      else:
        c1buildable = self.items.get(int(c[0]), 0) > 0
        c2buildable = self.items.get(int(c[1]), 0) > 0
        buildable = c1buildable and c2buildable
      result.append(self.rendercomponentstr(c[0], c[1], 'w',
        minitclass = 'showdel' if not c1buildable else '',
        minibclass = 'showdel' if not c2buildable else '',
        imgclass = 'showdel' if not buildable else '',
        imgextra = "onclick='ti.ti.delwanted(\"{0}\")'".format(c)
      ))
    sih('wanted', ''.join(result))

  def rendercomponentstr(self, c1, c2, typ, minitclass = '', minibclass = '', imgclass = '', imgextra = ''):
    c1name = baseitem[int(c1)]
    c2name = baseitem[int(c2)]
    item = items.bycombine[''.join((c1,c2))]
    itemtitle = '{0}: {1}'.format(item.name, item.text)
    return '''
      <div class="component">
        <div class="minit"><img src="img/{c1}.png" title="{c1name}" class="minit {minitclass}"></div>
        <div class="minib"><img src="img/{c2}.png" title="{c2name}" class="minib {minibclass}"></div>
        <div class="combitem">
          <img src="img/{c1}{c2}.png" title="{itemtitle}" class="component {imgclass}"
               onmouseover='ti.ti.tip("{typ}", "{c1}{c2}")'
               onmouseout='ti.ti.tipout("{typ}")' {imgextra}>
        </div>
      </div>'''.format(c1 = c1, c2 = c2,  c1name = c1name, c2name = c2name,
                       itemtitle = itemtitle, typ = typ,
                       minibclass = minibclass, minitclass = minitclass,
                       imgclass = imgclass, imgextra = imgextra)
  # __pragma__('nokwargs')

  def mkbuttons(self):
    result = []
    for iidx in range(8):
      result.append('<img src="img/{0}.png" class="add" title="{1}" onclick="ti.ti.incitem(\'{2}\')">'.format(iidx, baseitem[iidx], iidx))
    result.append('<br>')
    sih('baseitems', ''.join(result))

items = Items()
ti = TI()
ti.mkbuttons()
ti.mkwantedoptions()
