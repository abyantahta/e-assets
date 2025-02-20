<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $roles = Role::select('id','name')->get();
        // dd($roles);
        return Inertia::render('Auth/Register',[
            'roles' => $roles,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'position' => 'required|string|max:255',
            'role' => 'required|string|'
        ]);
        // dd($request);
        // $role = Role::select('id')->where('name',$request->role)->get();
        // dd($role, $request->role);
        // dd(intval($request->role));
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => intval($request->role),
            'position' => $request->position,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));
        $activity = Activity::all()->last();
        $activity->description;
        $activity->subject;
        $activity->changes;

        // Auth::login($user);

        return redirect(route('items.index', absolute: false));
    }
}
