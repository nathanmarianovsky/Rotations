require.config({
    baseUrl: "",
    paths: {
        app: "/scripts/js",
        lib: "/node_modules",
        jquery: "/node_modules/jquery/dist/jquery.min",
        materialize: "/bower_components/materializecss-amd/dist/materialize.amd.min",
        three: "/scripts/three.js/build/three.min",
        mathjax: "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
    },
    shim: {
        materialize: {
            exports: "Materialize",
            deps: ["jquery"]
        },
        mathjax: {
            exports: "MathJax",
            init: function () {
                MathJax.Hub.Config({
                    tex2jax: {inlineMath: [["$","$"], ["\\(","\\)"]]}
                });
                MathJax.Hub.Startup.onload();
                return MathJax;
            }
        }
    }
});

requirejs(["/node_modules/masonry-layout/dist/masonry.pkgd.js",], Masonry => {
    new Masonry( '.grid', {
        columnWidth: ".grid-sizer",
        itemSelector: ".grid-item"
    });
});

require(["app/main"]);