<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fullname' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // default password for testing
            'is_active' => true,
            'role' => 'user',
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'last_login' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the user is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
        ]);
    }
    
    /**
     * Configure the model factory.
     */
    public function configure()
    {
        return $this->afterCreating(function (User $user) {
            // Create a profile for each user
            $user->profile()->create([
                'full_name' => $this->faker->name(),
                'bio' => $this->faker->paragraph(),
                'date_of_birth' => $this->faker->dateTimeBetween('-40 years', '-18 years')->format('Y-m-d'),
                'gender' => $this->faker->randomElement(['male', 'female', 'other']),
                'location' => $this->faker->city(),
            ]);
        });
    }
}