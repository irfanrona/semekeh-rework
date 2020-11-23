<?php

/**
 * IDK why i made this function..
 */
function matchWildcard($a){
    $b = ['.show', '.create', '.update', '.delete'];

    for($i = 0; $i < count($b); $i++)
        if($a === 'users'.$b[$i] || $a === 'role'.$b[$i] || $a === 'audits'.$b[$i] || $a === 'meta-tags'.$b[$i])
            return true;
    
    return false;
}

/**
 * Store file to storage (Seeder only)
 * 
 * @param string $target
 * @param string $path
 * 
 * @return string
 */
function path($target, $path){
    $file = $target.DIRECTORY_SEPARATOR.$path;

    if(!is_file(appStoragePath($file)))
        \Storage::disk('public')->put($file,
            file_get_contents(url('img/'.$path))
        );

    return $target.'/'.$path;
}

/**
 * This will be return storage path.
 * 
 * This function should be working
 * if you had run this command:
 * 
 * php artisan storage:link
 * 
 * @param string $path
 * 
 * @return string
 */
function appStoragePath($path){
    return public_path('storage'.DIRECTORY_SEPARATOR.$path);
}

/**
 * This will return any text with kebab case.
 * 
 * @return string
 */
function kebabCase($text){
    // replace non letter or digits by -
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);

    // transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

    // remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);

    // trim
    $text = trim($text, '-');

    // remove duplicate -
    $text = preg_replace('~-+~', '-', $text);

    // lowercase
    $text = strtolower($text);

    if (empty($text))
        return 'n-a';

    return $text;
}

/**
 * This should be compress the image
 * with correct storage path.
 * 
 * @return \Intervention\Image\Image
 */
function imgCompress($path){
    if(is_array($path)){
        foreach($path as $p)
            imgCompress($p);
    }else{
        $a = pathinfo($path)['extension'];

        if($a === 'jpg' || $a === 'jpeg' || $a === 'png')
            return \Image::make(appStoragePath($path))->save();
    }
    
    return false;
}
