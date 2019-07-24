# Description

Tools for the game Team Fight Tactics to aid with calculating what items are buildable from a set of components.

# Features

1. Shows all items you can build from a set of components.

2. Shows all permutations of the items you can build from a set of components.

3. You can put items in your wanted list and it will show you whether they are buildable and what you need if not.

This tool is primarily useful displayed on a tab or device while playing.

# Help

Click a component in **Shop** to add it. You can click it in **Have** to remove it.

You can add a wanted item by selecting the name from the dropdown under **Want**. Click the item icon in the same area to remove it.

You can click an item in **Buildable** to remove the components for that item.

The **Combinations** section shows all permutations of buildable items with the components you have. Each part is sorted by a tier list and lower quality items (Ruunan's Hurricane for example) are shown slightly faded out.

# Building

1. You will need a recent version of Python 3.x: https://python.org/
2. You will need Transcrypt: https://www.transcrypt.org/ - I suggest following their instructions to set it up with a Python virtual environment.
3. If on a Unix type OS, run `utils/build.sh`. Alternatively inspect the script and run the equivalent commands for your OS.

You can serve a local version of the site by changing to the `site` directory and running `python3 -m http.server 8000` and then navigate to `http://127.0.0.1:8000/index.html`.
