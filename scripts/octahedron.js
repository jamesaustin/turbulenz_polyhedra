var octahedron = {
    name: "octahedron",
    vertexBuffer: null,
    indexBuffer: null,
    init: function initFn(size, colors) {
        var r = colors[0][0],
            g = colors[0][1],
            b = colors[0][2],
            a = colors[0][3];

        var positions = [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0,-1, 0],
            [0, 0, 1],
            [0, 0,-1]
        ];

        var faces = [
            [0, 2, 4],
            [0, 4, 3],
            [0, 3, 5],
            [0, 5, 2],
            [1, 2, 5],
            [1, 5, 3],
            [1, 3, 4],
            [1, 4, 2]
        ];

        var vertexBuffer = graphicsDevice.createVertexBuffer({
            numVertices: faces.length * 3,
            attributes: ['FLOAT3', 'FLOAT3', 'UBYTE4N'],
            dynamic: false,
        });
        if (vertexBuffer) {
            var writer = vertexBuffer.map();
            if (writer) {
                var faceCount = faces.length;
                for (var i = 0; i < faceCount; i += 1) {
                    var face = faces[i]
                    var p0 = positions[face[0]],
                        p1 = positions[face[1]],
                        p2 = positions[face[2]];

                    var d01 = mathDevice.v3Sub(p1, p0);
                    var d02 = mathDevice.v3Sub(p2, p0);
                    var n = mathDevice.v3Normalize(mathDevice.v3Cross(d01, d02));

                    writer(p0[0], p0[1], p0[2], n[0], n[1], n[2], r, g, b, a);
                    writer(p1[0], p1[1], p1[2], n[0], n[1], n[2], r, g, b, a);
                    writer(p2[0], p2[1], p2[2], n[0], n[1], n[2], r, g, b, a);
                }
                vertexBuffer.unmap(writer);
                writer = null;
                this.vertexBuffer = vertexBuffer;
            }
        }
    }
}
