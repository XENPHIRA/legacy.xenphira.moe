#!/usr/bin/env python
"""generate json data file for page function"""

import os
import json

ALLOWED_IMAGE_EXTENSIONS = ["PNG", "JPG", "JPEG", "GIF"]

def gen_artist_link(artist_name, artist_platform):
    source_map = {
        "FA": "https://furaffinity.net/user/ARTISTNAMEHERE",
        "Twitter": "https://twitter.com/ARTISTNAMEHERE",
        "Instagram": "https://instagram.com/ARTISTNAMEHERE",
        "Tumblr": "https://ARTISTNAMEHERE.tumblr.com/",
        "Unknown": "https://google.com/search?q=ARTISTNAMEHERE+art"
    }
    if artist_platform == "FA":
        effective_artist_link = source_map.get("FA").replace("ARTISTNAMEHERE", artist_name)
    elif artist_platform == "Twitter":
        effective_artist_link = source_map.get("Twitter").replace("ARTISTNAMEHERE", artist_name)
    elif artist_platform == "Instagram":
        effective_artist_link = source_map.get("Instagram").replace("ARTISTNAMEHERE", artist_name)
    elif artist_platform == "Tumblr":
        effective_artist_link = source_map.get("Tumblr").replace("ARTISTNAMEHERE", artist_name)
    else:
        effective_artist_link = source_map.get("Unknown").replace("ARTISTNAMEHERE", artist_name)
    return effective_artist_link

def main():
    cwd = os.getcwd() + "/"
    nav_to_refs_assets = "../../assets/ref/characters/"
    path_to_char_names = cwd + nav_to_refs_assets
    print(path_to_char_names)
    characters = next(os.walk(path_to_char_names))[1]
    characters.sort()
    print("Building data file for characters: " + str(characters))

    data = {
        "XENPHIRA_CHARACTER_CATALOG_VERSION": "1.0.0",
        "characters": []
    }

    for c in characters:
        char_path = nav_to_refs_assets + c + "/"

        path_to_sfw_ref = None
        path_to_nsfw_ref = None
        path_to_sfw_art = None
        path_to_nsfw_art = None

        art_types = []

        sfw_art = None
        nsfw_art = None

        character_data = {
            "name": "",
            "pronouns": "",
            "age": "",
            "description": "",
            "colors": [],
            "likes": [],
            "dislikes": [],
            "personality_traits": [],
            "adopted": False,
            "original_owner": "XENPHIRA"
        }

        if os.path.exists(char_path + "ref/sfw/ref.png"):
            path_to_sfw_ref = char_path + "ref/sfw/ref.png"
            art_types.append("SFW")
            sfw_art = []
            with open(char_path + "ref/sfw/ref.meta.json", "r") as f:
                ref_meta = json.loads(f.read())
            ref_artist_name = ref_meta["ref_artist_name"]
            ref_artist_platform = ref_meta["ref_artist_platform"]
            effective_ref_artist_link = gen_artist_link(ref_artist_name, ref_artist_platform)
            sfw_art.append({
                "artist": ref_artist_name,
                "artist_platform": ref_artist_platform,
                "character": c,
                "effective_artist_link": effective_ref_artist_link,
                "path_to_art": path_to_sfw_ref,
                "rating": "SFW",
                "isref": True
            })

        if os.path.exists(char_path + "ref/nsfw/ref.png"):
            path_to_nsfw_ref = char_path + "ref/nsfw/ref.png"
            art_types.append("NSFW")
            nsfw_art = []
            with open(char_path + "ref/nsfw/ref.meta.json", "r") as f:
                ref_meta = json.loads(f.read())
            ref_artist_name = ref_meta["ref_artist_name"]
            ref_artist_platform = ref_meta["ref_artist_platform"]
            effective_ref_artist_link = gen_artist_link(ref_artist_name, ref_artist_platform)
            nsfw_art.append({
                "artist": ref_artist_name,
                "artist_platform": ref_artist_platform,
                "character": c,
                "effective_artist_link": effective_ref_artist_link,
                "path_to_art": path_to_sfw_ref,
                "rating": "NSFW",
                "isref": True
            })

        if os.path.exists(char_path + "art/sfw/"):
            path_to_sfw_art = char_path + "art/sfw/"
            if "SFW" not in art_types: 
                art_types.append("SFW")
            if sfw_art == None:
                sfw_art = []
        if os.path.exists(char_path + "art/nsfw/"):
            path_to_nsfw_art = char_path + "art/nsfw/"
            if "NSFW" not in art_types:
                art_types.append("NSFW")
            if nsfw_art == None:
                nsfw_art = []

        if os.path.exists(char_path + "about.json"):
            with open(char_path + "about.json", "r") as bio:
                character_data = json.load(bio)

        if path_to_sfw_art:
            #print("SFW ART FOUND FOR " + c)
            for artist in next(os.walk(path_to_sfw_art))[1]:
                artist_parts = artist.replace("[","").replace("]","").split(" ")
                artist_name = artist_parts[0]
                artist_platform = artist_parts[1]
                #print("ARTIST: " + artist_name)
                #print("PLATFORM: " + artist_platform)
                artist_work_dir = path_to_sfw_art + artist + "/"
                #print(artist_work_dir)
                effective_artist_link = gen_artist_link(artist_name, artist_platform)
                
                for piece in next(os.walk(artist_work_dir))[2]:
                    if "hide." not in piece and piece[0] != "." and piece.split(".")[-1].upper() in ALLOWED_IMAGE_EXTENSIONS:
                        sfw_art.append({
                            "artist": artist_name,
                            "artist_platform": artist_platform,
                            "character": c,
                            "effective_artist_link": effective_artist_link,
                            "path_to_art": artist_work_dir + piece,
                            "rating": "SFW",
                            "isref": False
                        })
                    #print(artist + " -- " + piece)
            #print(json.dumps(sfw_art, indent=4))
        
        if path_to_nsfw_art:
            #print("NSFW ART FOUND FOR " + c)
            for artist in next(os.walk(path_to_nsfw_art))[1]:
                artist_parts = artist.replace("[","").replace("]","").split(" ")
                artist_name = artist_parts[0]
                artist_platform = artist_parts[1]
                #print("ARTIST: " + artist_name)
                #print("PLATFORM: " + artist_platform)
                artist_work_dir = path_to_nsfw_art + artist + "/"
                #print(artist_work_dir)
                effective_artist_link = gen_artist_link(artist_name, artist_platform)

                for piece in next(os.walk(artist_work_dir))[2]:
                    if "hide." not in piece and piece[0] != "." and piece.split(".")[-1].upper() in ALLOWED_IMAGE_EXTENSIONS:
                        nsfw_art.append({
                            "artist": artist_name,
                            "artist_platform": artist_platform,
                            "character": c,
                            "effective_artist_link": effective_artist_link,
                            "path_to_art": artist_work_dir + piece,
                            "rating": "NSFW"
                        })
                    #print(artist + " -- " + piece)
            #print(json.dumps(sfw_art, indent=4))

        data["characters"].append(
            {
                "character": c,
                "path_to_sfw_ref": path_to_sfw_ref,
                "path_to_nsfw_ref": path_to_nsfw_ref,
                "path_to_sfw_art": path_to_sfw_art,
                "path_to_nsfw_art": path_to_nsfw_art,
                "character_data": character_data,
                "art_types": art_types,
                "sfw_art": sfw_art,
                "nsfw_art": nsfw_art
            }
        )

    #print(json.dumps(data, indent=4))
    with open("./data.json", "w") as character_data_dump:
        character_data_dump.write(json.dumps(data))

if __name__ == "__main__":
    main()
