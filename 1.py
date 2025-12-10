# accidental_duplication.py

def greet_user(name):
    print(f"Hello, {name}!")
    print("Welcome to our program.")

# --- accidentally repeated code starts here ---

def greet_user(name):
    print(f"Hello, {name}!")
    print("Welcome to our program.")

# --- accidentally repeated code ends here ---

def main():
    greet_user("Alice")
    greet_user("Bob")


