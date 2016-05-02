require.config({
    baseUrl: "",
    paths: {
        app: "/scripts/front-end",
        lib: "/node_modules",
        jquery: "/node_modules/jquery/dist/jquery.min",
        materialize: "/bower_components/materializecss-amd/dist/materialize.amd.min",
        three: "/scripts/three.js/build/three.min",
        router5: "/node_modules/router5/dist/amd/router5.min",
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

require(["app/main"]);