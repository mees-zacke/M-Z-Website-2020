<?php

// H2 als standard bei Überschriften setzen
$GLOBALS['TL_DCA']['tl_content']['fields']['headline']['default'] = array('unit'=>'h2', 'value'=>'');
$GLOBALS['TL_DCA']['tl_content']['fields']['headline']['eval']['allowHtml'] = true;

// Link Picker in Text Elementen


use Contao\CoreBundle\DataContainer\PaletteManipulator;

PaletteManipulator::create()

    ->addField('singleSRC2', 'image_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('mobileSRC', 'image_legend', PaletteManipulator::POSITION_APPEND)

    ->applyToSubpalette('addImage', 'tl_content')
    ->applyToSubpalette('useImage', 'tl_content')
    ;

PaletteManipulator::create()

    ->addField('singleSRC2', 'source_legend', PaletteManipulator::POSITION_APPEND)
    ->addField('mobileSRC', 'source_legend', PaletteManipulator::POSITION_APPEND)

    ->applyToPalette('image', 'tl_content')
    ;



$GLOBALS['TL_DCA']['tl_content']['fields']['singleSRC2'] = [
            'label' => ['Hoverbild hinzufügen', 'Fügt ein Bild hinzu, welches beim über-das-Bild-hovern erscheint'],
			'exclude'                 => true,
			'inputType'               => 'fileTree',
			'eval'                    => array('filesOnly'=>true, 'fieldType'=>'radio', 'tl_class'=>'clr'),
			'load_callback' => array
			(
				array('tl_content', 'setSingleSrcFlags')
			),
			'sql'                     => "binary(16) NULL"

];

$GLOBALS['TL_DCA']['tl_content']['fields']['mobileSRC'] = [
            'label' => ['Mobilebild hinzufügen', 'Fügt ein Bild hinzu, welches in der mobilen Ansicht erscheint'],
			'exclude'                 => true,
			'inputType'               => 'fileTree',
			'eval'                    => array('filesOnly'=>true, 'fieldType'=>'radio', 'tl_class'=>'clr'),
			'load_callback' => array
			(
				array('tl_content', 'setSingleSrcFlags')
			),
			'sql'                     => "binary(16) NULL"

];

