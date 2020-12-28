<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Agenda;
use App\Models\Alumni;
use App\Models\Carousel;
use App\Models\Company;
use App\Models\Council;
use App\Models\Employee;
use App\Models\Footer;
use App\Models\Gallery;
use App\Models\Keyword;
use App\Models\Meta;
use App\Models\Prestation;
use App\Models\Profile;
use App\Models\Section;
use App\Models\Social;
use App\Models\Study;
use App\Models\Video;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index(){
    	return view('welcome', ['data' => Meta::orderBy('id')->get(['type', 'key', 'value'])]);
    }
    public function navbar(){
        return response([
            'bpi' => Keyword::find(1)->value,
            'study' => Study::orderBy('title')->get(['title', 'slug'])
        ]);
    }
    public function footer(){
        return response(Agenda::latest()->first(['banner', 'title', 'time', 'slug']));
    }
    public function home($str = ''){
        // Request chaining
        // switch ($str) {
        //     case 'carousel':
        //         $a = Carousel::oldest()->get(['description', 'title', 'type', 'url']);
        //         break;
        //     case 'video':
        //         $a = Video::whereIsPublish(true)->latest()->get(['thumbnail', 'video']);
        //         break;
        //     case 'about':
        //         $a = About::whereId(1)->first(['content', 'url']);
        //         break;
        //     case 'alumni':
        //         $a = Alumni::whereIsPublish(true)->latest()->get(['company', 'content', 'name', 'url']);
        //         break;
        //     case 'company':
        //         $a = Company::latest()->get(['link', 'url']);
        //         break;
        //     case 'section':
        //         $a = Section::orderBy('id')->get(['title', 'subtitle']);
        //         break;
        //     case 'prestation':
        //         $a = Prestation::latest()->limit(3)->get(['rank', 'title', 'url', 'year']);
        //         break;
        //     case 'agenda':
        //         $a = Agenda::latest()->first(['banner', 'content', 'slug', 'time', 'title']);
        //         break;

        //     default:
        //         $a = [];
        //         break;
        // }
        // return response($a);

        // Request once
        return response([
            'carousel' => Carousel::oldest()->get(['description', 'title', 'type', 'url']),
            'video' => Video::whereIsPublish(true)->latest()->get(['thumbnail', 'video']),
            'about' => About::whereId(1)->first(['content', 'url']),
            'alumni' => Alumni::whereIsPublish(true)->latest()->get(['company', 'content', 'name', 'url']),
            'company' => Company::latest()->get(['link', 'url']),
            'section' => Section::orderBy('id')->get(['title', 'subtitle']),
            'prestation' => Prestation::latest()->limit(3)->get(['rank', 'title', 'url', 'year']),
            'agenda' => Agenda::latest()->first(['banner', 'content', 'slug', 'time', 'title'])
        ]);
    }
    public function keyword(){
        return response(Keyword::get(['key', 'value']));
    }
    public function social(){
        return response([
            'social' => Social::latest()->get(['icon', 'link']),
            'footer' => Footer::latest()->get(['key', 'value'])
        ]);
    }
    public function profile($id){
        if($check = Profile::find($id)){
            $obj = [
                'content' => $check,
                'img' => Gallery::whereTarget(1)
                    ->whereType($check->id)
                    ->latest()
                    ->get('url')
            ];

            if($check->id === 3)
                $obj['council'] = Council::whereId(1)->first(['title', 'json']);

            $r = response($obj);
        }else
            $r = response(['content' => null, 'img' => []]);

        return $r;
    }
    public function study($id){
        if($check = Study::whereSlug($id)->first(['banner', 'title', 'content', 'content_2', 'slug']))
            $r = response($check);
        else $r = response(null);

        return $r;
    }
    public function agenda(){
        return response(Agenda::latest()->get(['slug', 'title', 'time', 'content', 'banner']));
    }
    public function agendaDetail($id){
        if($a = Agenda::whereSlug($id)->first())
            $r = response([
                'agenda' => $a->only(['slug', 'title', 'time', 'content', 'banner']),
                'img' => Gallery::whereTarget(3)
                    ->whereType($a->id)
                    ->latest()
                    ->get('url'),
                'other' => Agenda::where('id', '!=', $a->id)
                    ->inRandomOrder()
                    ->limit(3)
                    ->get(['title', 'time', 'banner', 'slug'])
            ]);
        else $r = response(null);

        return $r;
    }
    public function prestation(){
        return response(Prestation::latest()->get(['title', 'rank', 'year', 'url']));
    }
    public function gallery(){
        return response([
            'img' => Gallery::latest('id')->get('url'),
            'video' => Video::latest()->get(['thumbnail', 'video'])
        ]);
    }
    public function employee(){
        return response([
            'employee' => Employee::latest()->get(['title', 'name', 'url', 'type', 'child_type']),
            'img' => Gallery::whereTarget(4)
                ->latest()
                ->get('url')
        ]);
    }
    public function search(){
        return response([
            'agenda' => Agenda::search(request()->q),
            'pres' => Prestation::search(request()->q)
        ]);
    }
    // public function viewFile($path){
    //     return response()->file($path);
    // }
}
