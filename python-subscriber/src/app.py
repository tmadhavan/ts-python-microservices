import threading
from message_subscriber import start_consuming
from message_publisher import publish_message_test


def main():
    # start consumer thread
    print("Starting consumer thread...")
    t1 = threading.Thread(target=start_consuming, daemon=True)
    t1.start()

    # start a dummy publisher thread that fires off a message periodically
    print("Starting publisher thread...")
    # t2 = threading.Thread(target=publish_message, args=("test",), daemon=True)
    t2 = threading.Thread(target=publish_message_test, daemon=True)
    t2.start()

    for thrd in [t1, t2]:
        thrd.join()


if __name__ == "__main__":
    main()
