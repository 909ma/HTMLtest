import requests
import json
from lostark_api_token import Token

headers = {
    'accept': 'application/json',
    'authorization': Token
}

CharacterName = '멀리서춤만추는응원형서폿'
url = 'https://developer-lostark.game.onstove.com/armories/characters/' + CharacterName + '/combat-skills'

response = requests.get(url, headers=headers)
jsonObject = response.json()

# JSON 파일로 저장 (UTF-8 인코딩)
output_file_path = 'output.json'
with open(output_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(jsonObject, json_file, ensure_ascii=False)

print(f"Data saved to {output_file_path}")
