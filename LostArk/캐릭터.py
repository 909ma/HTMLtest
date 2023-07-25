import requests
import os
import json
from lostark_api_token import Token

headers = {"accept": "application/json", "authorization": Token}

if not os.path.exists("result"):
    os.makedirs("result")

CharacterList = {
    "1": "멀리서춤만추는응원형서폿",
    "2": "오지마노스렌드에",
    "3": "Hanok007",
    "4": "눈속의스타",
}

FriendList = ["1", "2", "3", "4"]

for i in range(len(FriendList)):
    name = FriendList[i]

    CharacterName = CharacterList[name]
    url = (
        "https://developer-lostark.game.onstove.com/characters/"
        + CharacterName
        + "/siblings"
    )

    response = requests.get(url, headers=headers)
    jsonObject = response.json()

    # 'ServerName'이 '실리안'인 데이터만 저장
    filtered_data = []
    for data in jsonObject:
        if data.get("ServerName") == "실리안":
            filtered_data.append(data)

    # 'ItemMaxLevel'을 기준으로 내림차순 정렬
    sorted_data = sorted(
        filtered_data,
        key=lambda x: float(x.get("ItemMaxLevel").replace(",", "")),
        reverse=True,
    )

    # JSON 파일로 저장 (UTF-8 인코딩)
    output_file_path = f"./result/{FriendList[i]}.json"
    with open(output_file_path, "w", encoding="utf-8") as json_file:
        json.dump(sorted_data, json_file, ensure_ascii=False)

print("Data saved")
