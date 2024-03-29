# Description

Tool for the game Team Fight Tactics to aid with calculating what items are buildable from a set of components.

# Features

1. Shows all combinations of items you can build from your components. This is the primary unique feature the tool offers.

2. Shows all items you can build from a set of components.

3. Shows all items you are one component off from building.

4. Dynamic cheatsheet which shows the items you can build and that you're one component off from building.

5. You can put items in your wanted list and it will show you whether they are buildable and what you need if not.

6. You can filter Combinations to show only groups with Sword of Shojin, for example.

This tool is primarily useful displayed on a tab or device while playing. If you don't play in fullscreen mode, you should be able to hit F9 to unlock the mouse cursor.

# Help

Click a component in **Shop** to add it. You can click it in **Have** to remove it. You generally want to keep this is sync with the components you have in game.

You can add watched item by selecting the name from the dropdown under **Want**. Click the item icon in the same area to remove it. You may also use separate want list profiles for different builds using an anchor link. For example: https://kerfufflev2.github.io/tfti/#yordles

You can click an item in **Buildable** to remove both components for that item.

The **One-off** section shows all items you are one component away from building. You can click an item in this section to filter by the missing component. Click again (or click the filter) to clear it.

The **Combinations** section shows all combinations of buildable items with the components you have. Each part is sorted by a tier list and lower quality items (Ruunan's Hurricane for example) are shown slightly faded out. You can click an item in this section to filter out any groups that don't have the item. Click the filter to clear it.

# Building

1. You will need a recent version of Python 3.x: https://python.org/
2. You will need Transcrypt: https://www.transcrypt.org/ - I suggest following their instructions to set it up with a Python virtual environment.
3. If on a Unix type OS, run `utils/build.sh`. Alternatively inspect the script and run the equivalent commands for your OS.

# Contact

The best way to get in touch with me is by reddit private message: https://www.reddit.com/message/compose?to=KerfuffleV2

Alternatively, you can add an issue in the Github repo for this project ( https://github.com/KerfuffleV2/tfti/issues ) but it may take me a while to respond as I don't check that frequently.

# Tips

1. You can serve a local version of the site by changing to the `site` directory and running `python3 -m http.server 8000` and then navigate to `http://127.0.0.1:8000/index.html`.

