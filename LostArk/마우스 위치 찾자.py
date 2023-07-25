import pyautogui

# 현재 마우스 커서의 위치를 알아냄
current_x, current_y = pyautogui.position()

print(f"마우스 커서의 현재 위치: ({current_x}, {current_y})")
