package fi.nls.fileservice.jcr.repository;

import java.io.IOException;

import javax.jcr.Repository;
import javax.jcr.RepositoryException;

import org.modeshape.common.collection.Problems;
import org.modeshape.jcr.ModeShapeEngine;
import org.modeshape.jcr.RepositoryConfiguration;

public class TestRepositoryProvider {

    private ModeShapeEngine engine;

    public Repository getRepositories() throws IOException, RepositoryException {

        if (engine == null) {
            this.engine = new ModeShapeEngine();
            engine.start();

            RepositoryConfiguration config = RepositoryConfiguration.read(
                    Thread.currentThread().getContextClassLoader()
                            .getResourceAsStream("repository.json"),
                    "aineistot");

            Problems problems = config.validate();
            if (problems.hasErrors()) {
                System.err.println(problems);
                System.exit(-1);
            }

            engine.deploy(config);
        }
        return engine.getRepository("aineistot");

    }

    public void shutdown() {
        engine.shutdown();
    }

}
