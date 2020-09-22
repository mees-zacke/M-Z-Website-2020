<?php

/** Some extra BE CSS and JS */
if (TL_MODE == 'BE')
{
    $objUser = \BackendUser::getInstance();

    $GLOBALS['TL_CSS'][]        = 'files/layout/styles/css/mz_be.css';
}