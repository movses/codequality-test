<?php

function calculateTotal($items) {
    // TODO: Implement discount logic for premium users
    $total = 0;
    foreach ($items as $item) {
        $total += $item['price'];
    }
    return $total;
}
