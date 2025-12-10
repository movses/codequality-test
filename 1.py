# accidental_duplication.py

def greet_user(name):
    print(f"Hello, {name}!")
    print("Welcome to our program.")

# --- accidentally repeated code starts here ---

def greet_user(name):
    print(f"Hello, {name}!")
    print("Welcome to our program.")

# --- accidentally repeated code ends here ---


def say_good_user(name):
    print(f"Goodbye, {name}!")
    print("Thanks for using our program.")

# --- accidentally repeated code starts here ---

def say_good_user(name):
    print(f"Goodbye, {name}!")
    print("Thanks for using our program.")

# --- accidentally repeated code ends here ---

def main():
    greet_user("Alice")
    greet_user("Bob")


if __name__ == "__main__":
    main()
