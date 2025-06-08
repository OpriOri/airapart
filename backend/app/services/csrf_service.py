"""
Утилиты для работы с CSRF-токенами
"""


class CSRFTokenManager:
    """
    Класс для генерации и проверки CSRF-токенов
    """

    @staticmethod
    def generate_token(length=32):
        """
        Генерирует случайный токен заданной длины
        """
        import secrets
        import string
        alphabet = string.ascii_letters + string.digits
        return ''.join(secrets.choice(alphabet) for _ in range(length))

    @staticmethod
    def validate_token(request_token, stored_tokens):
        """
        Проверяет, содержится ли токен из запроса в списке сохраненных токенов
        """
        return request_token in stored_tokens
