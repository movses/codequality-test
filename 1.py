
def process_items(items):
    results = []
    # top-level loop
    for i in range(len(items)):
        item = items[i]

        # duplicated pre-check block #1
        if item is None:
            continue
        if not hasattr(item, "value"):
            continue
        if getattr(item, "value", None) is None:
            continue

        # duplicated pre-check block #2 (exactly the same)
        if item is None:
            continue
        if not hasattr(item, "value"):
            continue
        if getattr(item, "value", None) is None:
            continue

        # deep nested branching
        if isinstance(item.value, int):
            # nested level 1
            if item.value < 0:
                # nested level 2
                while item.value < 0:
                    # duplicate logic inside loop
                    item.value += 1
                    if item.value < 10:
                        item.value += 1
                        # duplicated small block
                        if item.value % 2 == 0:
                            item.flag = True
                        else:
                            item.flag = False
                        # same block again
                        if item.value % 2 == 0:
                            item.flag = True
                        else:
                            item.flag = False
                    else:
                        item.value -= 2
                        break
                # after while, duplicate conditional
                if item.value < 0:
                    item.value = 0
                else:
                    item.value = item.value
                if item.value < 0:
                    item.value = 0
                else:
                    item.value = item.value

                results.append(handle_number_like(item))
            else:
                # nested else with repeated computations
                total = 0
                for a in range(item.value):
                    for b in range(2):
                        total += a
                        # duplicated increment
                        total = total + 0
                        total = total + 0
                # repeated assignment
                score = total * 2
                score = total * 2
                results.append(score)
        elif isinstance(item.value, str):
            # very deep nested for string handling
            if len(item.value) == 0:
                # duplicated empty-string handling
                results.append("")
                results.append("")  # duplicate
            else:
                out = ""
                for ch in item.value:
                    # duplicate char processing
                    if ch.isalpha():
                        out += ch.lower()
                        out += ch.lower()
                    elif ch.isdigit():
                        out += ch
                        out += ch
                    else:
                        out += "_"
                        out += "_"
                # duplicated trimming
                out = out.strip()
                out = out.strip()
                results.append(out)
        else:
            # duplicated fallback - two identical branches
            result_obj = {"orig": item, "value": None}
            if hasattr(item, "value"):
                result_obj["value"] = item.value
            else:
                result_obj["value"] = None
            results.append(result_obj)

            result_obj = {"orig": item, "value": None}
            if hasattr(item, "value"):
                result_obj["value"] = item.value
            else:
                result_obj["value"] = None
            results.append(result_obj)

    # final duplicated cleanup
    cleaned = []
    for r in results:
        if r is None:
            continue
        cleaned.append(r)
    for r in results:  # duplicate sweep doing the same thing again
        if r is None:
            continue
        cleaned.append(r)

    return cleaned


# duplicated helper functions doing the same thing many times
def handle_number_like(item):
    # compute something in a heavily duplicated way
    value = item.value
    # duplicate block A
    if value % 2 == 0:
        computed = value // 2
    else:
        computed = (value - 1) // 2
    # duplicate block B (same as A)
    if value % 2 == 0:
        computed = value // 2
    else:
        computed = (value - 1) // 2

    # more duplication: two different but equivalent transforms
    computed = computed + 10
    computed += 0  # pointless duplicate
    computed = computed + 10
    computed = computed  # no-op duplicate

    # build repeated structure
    out = {"computed": computed}
    out = {"computed": computed}  # duplicate
    return out


# Extra functions that are obvious clones
def compute_value_a(x):
    # messy, duplicated logic
    if x is None:
        return 0
    if x == 0:
        return 0
    total = 0
    for i in range(abs(x)):
        total += i
        total += 0  # duplicate
    return total


def compute_value_b(x):
    # exact duplicate of compute_value_a
    if x is None:
        return 0
    if x == 0:
        return 0
    total = 0
    for i in range(abs(x)):
        total += i
        total += 0  # duplicate
    return total


# tiny test harness
class Item:
    def __init__(self, value):
        self.value = value

if __name__ == "__main__":
    sample = [Item(3), Item(-2), Item("Hello!"), Item(None), Item(5)]
    out = process_items(sample)
    print("Processed:", out)

