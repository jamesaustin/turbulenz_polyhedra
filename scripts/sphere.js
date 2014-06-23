var sphere = {
    name: "sphere",
    vertexBuffer: null,
    indexBuffer: null,
    init: function initFn(size, colors, recursionLevel) {
        var r = colors[0][0],
            g = colors[0][1],
            b = colors[0][2],
            a = colors[0][3];


        var radius = size;
        var positions = [];
        var normals = [];
        var indices = [];
        var cache = {};

        // Golden ratio
        var t = (1.0 + Math.sqrt(5.0)) / 2.0;

        // Default recursion level of 1
        recursionLevel = (!recursionLevel) ? 1 : recursionLevel;

        // add vertex to mesh, fix position to be on unit sphere then scale up to required radius
        // return index
        function addVertex(p0, p1, p2) {
            var length = Math.sqrt(p0 * p0 + p1 * p1 + p2 * p2);
            var scale = radius / length;
            positions[positions.length] = p0 * scale;
            positions[positions.length] = p1 * scale;
            positions[positions.length] = p2 * scale;
            return (positions.length / 3) - 1;
        }

        // return index of point in the middle of p1 and p2
        function getMiddlePoint(p1, p2) {
            // first check if we have it already
            var firstIsSmaller = p1 < p2;
            var k1 = firstIsSmaller ? p1 : p2;
            var k2 = firstIsSmaller ? p2 : p1;
            var key = k1.toString() + k2.toString() + (k1 + k2);

            if (cache[key]) {
                return cache[key];
            }

            // not in cache, calculate it - take in to account positions are stored
            // as a single array
            p1 = p1 * 3;
            p2 = p2 * 3;
            var i = addVertex((positions[p1] + positions[p2]) * 0.5, (positions[p1 + 1] + positions[p2 + 1]) * 0.5, (positions[p1 + 2] + positions[p2 + 2]) * 0.5);

            // store it, return index
            cache[key] = i;
            return i;
        }

        // create 12 vertices of an icosahedron - default unit parameters
        addVertex(-1, t, 0);
        addVertex(1, t, 0);
        addVertex(-1, -t, 0);
        addVertex(1, -t, 0);

        addVertex(0, -1, t);
        addVertex(0, 1, t);
        addVertex(0, -1, -t);
        addVertex(0, 1, -t);

        addVertex(t, 0, -1);
        addVertex(t, 0, 1);
        addVertex(-t, 0, -1);
        addVertex(-t, 0, 1);

        // create 20 triangles of the icosahedron
        indices = [
            0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
            3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1
        ];

        for (var i = 0; i < recursionLevel; i += 1) {
            var newindices = [];
            for (var j = 0; j < indices.length; j += 3) {
                // Current triangle
                var a = indices[j];
                var b = indices[j + 1];
                var c = indices[j + 2];

                // replace triangle by 4 triangles
                var d = getMiddlePoint(a, b);
                var e = getMiddlePoint(b, c);
                var f = getMiddlePoint(c, a);

                newindices[newindices.length] = a;
                newindices[newindices.length] = d;
                newindices[newindices.length] = f;

                newindices[newindices.length] = b;
                newindices[newindices.length] = e;
                newindices[newindices.length] = d;

                newindices[newindices.length] = c;
                newindices[newindices.length] = f;
                newindices[newindices.length] = e;

                newindices[newindices.length] = d;
                newindices[newindices.length] = e;
                newindices[newindices.length] = f;
            }
            indices = newindices;
        }

        var vertexBuffer = graphicsDevice.createVertexBuffer({
            numVertices: positions.length,
            attributes: ['FLOAT3', 'FLOAT3', 'UBYTE4N'],
            dynamic: false,
        });
        if (vertexBuffer) {
            var writer = vertexBuffer.map();
            if (writer) {
                var positionCount = positions.length;
                for (var i = 0; i < positionCount; i += 3) {
                    var p0 = positions[i],
                        p1 = positions[i + 1],
                        p2 = positions[i + 2];
                    var n = mathDevice.v3Normalize(mathDevice.v3Build(p0, p1, p2));

                    writer(p0, p1, p2, n[0], n[1], n[2], r, g, b, a);
                }
                vertexBuffer.unmap(writer);
                writer = null;
                this.vertexBuffer = vertexBuffer;
            }
        }

        this.indexBuffer = graphicsDevice.createIndexBuffer({
            numIndices: indices.length,
            format: 'USHORT',
            dynamic: false,
            data: indices
        });
    }
}
