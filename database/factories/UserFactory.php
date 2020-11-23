<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
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
     * @return array
     */
    public function definition()
    {
        $arr = [['Superadmin', 'super'], ['Admin', 'admin']];

        static $i = 0;

        return [
            'name' => $arr[$i][0],
            'email' => $arr[$i++][1].'@smkbpi.sch.id',
            'email_verified_at' => now(),
            'password' => '$2y$10$yvz16qcGlfgI0RkfhYrm6.JWLfqxNm28f2CTbbiuzqMs9fJ630Wfi', // 12345678
            'role_id' => $i,
        ];
    }
}
