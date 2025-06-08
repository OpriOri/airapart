import logging
import sys

logger = logging.getLogger("bot_logger")
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter(
"[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s", "%Y-%m-%d %H:%M:%S"
)

console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(formatter)

logger.addHandler(console_handler)