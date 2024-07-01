<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'product_name' => $this->faker->word,
            'product_price' => $this->faker->randomFloat(2, 10, 1000),
            'product_category' => $this->faker->word,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
