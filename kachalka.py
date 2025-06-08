# import os
# import requests
#
#
# def clean_url(url):
#     """Очищает URL от лишних кавычек и пробелов"""
#     return url.strip().strip("'").strip('"')
#
#
# def download_images(apartment_id, main_url, additional_urls):
#     save_folder = r'C:\Users\shed2\PycharmProjects\rental-website\src\pictures'
#
#     if not os.path.exists(save_folder):
#         os.makedirs(save_folder)
#
#     # Скачиваем главное фото
#     if main_url:
#         try:
#             main_url = clean_url(main_url)
#             filename = os.path.join(save_folder, f"{apartment_id}_main.jpg")
#             with requests.get(main_url, stream=True) as r:
#                 r.raise_for_status()
#                 with open(filename, 'wb') as f:
#                     for chunk in r.iter_content(1024):
#                         f.write(chunk)
#             print(f"✓ Главное фото сохранено: {filename}")
#         except Exception as e:
#             print(f"✕ Ошибка загрузки главного фото: {e}")
#
#     # Скачиваем дополнительные фото
#     for i, url in enumerate(additional_urls, 1):
#         try:
#             url = clean_url(url)
#             filename = os.path.join(save_folder, f"{apartment_id}_{i}.jpg")
#             with requests.get(url, stream=True) as r:
#                 r.raise_for_status()
#                 with open(filename, 'wb') as f:
#                     for chunk in r.iter_content(1024):
#                         f.write(chunk)
#             print(f"✓ Доп. фото {i} сохранено: {filename}")
#         except Exception as e:
#             print(f"✕ Ошибка загрузки доп. фото {url}: {e}")
#
#
# if __name__ == "__main__":
#     print("=== Загрузчик фото для квартир ===")
#     print("Папка сохранения: C:\\Users\\shed2\\PycharmProjects\\rental-website\\src\\pictures\n")
#
#     # Запрашиваем данные
#     apartment_id = input("Введите ID квартиры: ").strip()
#     main_url = input("Введите URL главного фото: ").strip()
#
#     print("\nВведите дополнительные URL фото (можно списком в кавычках):")
#     print("Пример:")
#     print("'https://...', 'https://...', 'https://...'")
#     additional_input = input("Ваши URL: ").strip()
#
#     # Обрабатываем ввод дополнительных фото
#     additional_urls = []
#     if additional_input:
#         # Разбиваем строку по запятым, затем чистим каждый URL
#         additional_urls = [clean_url(url) for url in additional_input.split(',') if clean_url(url)]
#
#     # Загружаем фото
#     download_images(apartment_id, main_url, additional_urls)
#
#     input("\nНажмите Enter для выхода...")




















#
#
#
# import secrets
# import string
#
# def generate_webhook_secret(length=64):
#     alphabet = string.ascii_letters + string.digits + "!@#$%^&*()-_=+[]{}"
#     return ''.join(secrets.choice(alphabet) for _ in range(length))
#
# print(generate_webhook_secret())
# print(len(generate_webhook_secret()))
# print(len('42453969-ad56-4f5a-a025-834ce786aa42'))
# print(len('41a27f22-0c9f-41a1-994f-8bcac227910c'))
# #
#
#




